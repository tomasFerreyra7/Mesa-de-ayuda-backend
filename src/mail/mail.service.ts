import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function truncateOneLine(s: string, max: number): string {
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter | null = null;
  private readonly from: string;

  constructor(private readonly config: ConfigService) {
    this.from = this.config.get<string>('MAIL_FROM') ?? '"SistemaPJ" <noreply@localhost>';

    const enabled = ['1', 'true', 'yes'].includes((this.config.get<string>('MAIL_ENABLED') ?? '').toLowerCase());
    const host = this.config.get<string>('SMTP_HOST');

    if (!enabled || !host) {
      this.logger.log('Correo deshabilitado (definí MAIL_ENABLED=true y SMTP_HOST para activar)');
      return;
    }

    const port = parseInt(this.config.get<string>('SMTP_PORT') ?? '587', 10);
    const secure = ['1', 'true', 'yes'].includes((this.config.get<string>('SMTP_SECURE') ?? '').toLowerCase());
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user && pass ? { user, pass } : undefined,
    });
  }

  /** Aviso al técnico cuando le asignan un ticket (PATCH asignar o PATCH ticket con asignado_a_id). */
  async sendTicketAssignedToTechnician(opts: {
    to: string;
    tecnicoNombre: string;
    ticketId: number;
    nroTicket: string | null;
    asunto: string;
    prioridad: string;
    tipo: string;
  }): Promise<void> {
    if (!this.transporter) return;

    const to = opts.to?.trim();
    if (!to) {
      this.logger.warn(`Ticket #${opts.ticketId}: el técnico no tiene email configurado; no se envía aviso`);
      return;
    }

    const baseUrl = (this.config.get<string>('APP_PUBLIC_URL') ?? '').replace(/\/$/, '');
    /** El enlace sigue usando el id interno (lo que suele esperar el front); no lo mostramos en el cuerpo del mail. */
    const pathTicket = `/tickets/${opts.ticketId}`;
    const href = baseUrl ? `${baseUrl}${pathTicket}` : '';
    const nroRef = opts.nroTicket?.trim() || null;

    const subjectSuffix = nroRef ? `: ${truncateOneLine(nroRef, 80)}` : truncateOneLine(opts.asunto, 60) ? ` — ${truncateOneLine(opts.asunto, 60)}` : '';
    const subject = `[SistemaPJ] Te asignaron un ticket${subjectSuffix}`;

    const textLines = [`Hola ${opts.tecnicoNombre},`, '', 'Se te asignó un ticket en SistemaPJ.', ''];
    if (nroRef) textLines.push(`Referencia: ${nroRef}`, '');
    textLines.push(
      `Prioridad: ${opts.prioridad}`,
      `Tipo: ${opts.tipo}`,
      `Asunto: ${opts.asunto}`,
      '',
      href ? `Abrir en el sistema: ${href}` : baseUrl ? `Ingresá al sistema: ${baseUrl}` : 'Ingresá a SistemaPJ para ver el ticket en tu bandeja de asignados.',
      '',
      '— SistemaPJ (mensaje automático, no responder)',
    );
    const text = textLines.join('\n');

    const refLi = nroRef ? `<li><strong>Referencia:</strong> ${escapeHtml(nroRef)}</li>` : '';
    const html = `
      <p>Hola <strong>${escapeHtml(opts.tecnicoNombre)}</strong>,</p>
      <p>Se te asignó un ticket en <strong>SistemaPJ</strong>.</p>
      <ul>
        ${refLi}
        <li><strong>Prioridad:</strong> ${escapeHtml(opts.prioridad)}</li>
        <li><strong>Tipo:</strong> ${escapeHtml(opts.tipo)}</li>
        <li><strong>Asunto:</strong> ${escapeHtml(opts.asunto)}</li>
      </ul>
      ${href ? `<p><a href="${escapeHtml(href)}">Abrir ticket</a></p>` : baseUrl ? `<p><a href="${escapeHtml(baseUrl)}">Ir al sistema</a></p>` : ''}
      <p style="color:#666;font-size:12px">Mensaje automático — no responder.</p>
    `;

    await this.transporter.sendMail({
      from: this.from,
      to,
      subject,
      text,
      html,
    });

    this.logger.log(`Correo de asignación enviado a ${to} (ticket #${opts.ticketId})`);
  }
}
