import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { formatoBs, formatoCantidad } from '../calculo.model';

export type ModoNumero = 'monto' | 'cantidad';

function contarDigitos(texto: string): number {
  return (texto.match(/\d/g) ?? []).length;
}

function posicionPorDigitos(texto: string, digitos: number): number {
  if (digitos <= 0) return 0;
  let vistos = 0;
  for (let i = 0; i < texto.length; i++) {
    if (/\d/.test(texto[i])) {
      vistos++;
      if (vistos === digitos) return i + 1;
    }
  }
  return texto.length;
}

export function parsearNumeroEntrada(texto: string): number {
  const limpio = String(texto ?? '').replace(/\s/g, '');
  if (!limpio) return 0;

  const tieneComa = limpio.includes(',');
  const puntos = (limpio.match(/\./g) ?? []).length;
  let normalizado = limpio;

  if (tieneComa) {
    normalizado = limpio.replace(/\./g, '').replace(/,/g, '.');
  } else if (puntos > 1) {
    normalizado = limpio.replace(/\./g, '');
  } else if (puntos === 1) {
    const [enteroRaw, decimalRaw = ''] = limpio.split('.');
    const entero = enteroRaw.replace(/\D/g, '');
    const decimal = decimalRaw.replace(/\D/g, '');
    const esMiles =
      decimal.length === 3 && entero.length >= 1 && entero.length <= 3 && entero !== '0';
    normalizado = esMiles ? entero + decimal : `${entero || '0'}.${decimal}`;
  }

  normalizado = normalizado.replace(/[^\d.-]/g, '');
  const numero = Number(normalizado);
  return Number.isFinite(numero) ? numero : 0;
}

export function formatearEntrada(
  texto: string,
  maxDecimales: number,
  modo: ModoNumero = 'monto',
): string {
  const limpio = String(texto ?? '').replace(/\s/g, '');
  if (!limpio) return '';

  const puntos = (limpio.match(/\./g) ?? []).length;
  let parteEntera = limpio;
  let parteDecimal = '';
  let separadorDecimal = false;

  if (limpio.includes(',')) {
    const indice = limpio.lastIndexOf(',');
    parteEntera = limpio.slice(0, indice);
    parteDecimal = limpio.slice(indice + 1).replace(/\D/g, '');
    separadorDecimal = true;
  } else if (puntos === 1) {
    const [enteroRaw, decimalRaw = ''] = limpio.split('.');
    const entero = enteroRaw.replace(/\D/g, '');
    const decimal = decimalRaw.replace(/\D/g, '');
    const esMiles =
      modo === 'monto' &&
      decimal.length >= 3 &&
      entero.length >= 1 &&
      entero.length <= 3 &&
      entero !== '0';
    if (!esMiles) {
      parteEntera = enteroRaw;
      parteDecimal = decimal;
      separadorDecimal = true;
    }
  } else if (puntos > 1 && limpio.endsWith('.')) {
    parteEntera = limpio.slice(0, -1);
    separadorDecimal = true;
  }

  let entero = parteEntera.replace(/\D/g, '');
  if (!entero && !parteDecimal && !separadorDecimal) return '';
  entero = entero.replace(/^0+(?=\d)/, '') || '0';
  parteDecimal = parteDecimal.slice(0, Math.max(0, maxDecimales));

  const conMiles = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (separadorDecimal && !parteDecimal) return `${conMiles},`;
  return parteDecimal ? `${conMiles},${parteDecimal}` : conMiles;
}

@Directive({
  selector: 'input[appNumero]',
  standalone: true,
})
export class NumeroInputDirective implements OnInit, OnChanges {
  @Input('appNumeroValor') valor: number | null = 0;
  @Input('appNumeroModo') modo: ModoNumero = 'monto';
  @Input('appNumeroDecimales') decimales: number | null = null;
  @Output('appNumeroValorChange') valorChange = new EventEmitter<number>();

  private enfocado = false;

  constructor(private readonly el: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valor'] || changes['modo'] || changes['decimales']) {
      if (!this.enfocado) this.render();
    }
  }

  @HostListener('focus')
  alEnfocar(): void {
    this.enfocado = true;
    const input = this.el.nativeElement;
    if (!input.readOnly && parsearNumeroEntrada(input.value) === 0) {
      input.value = '';
    }
  }

  @HostListener('input', ['$event'])
  alEscribir(event: InputEvent): void {
    const input = this.el.nativeElement;
    const bruto = input.value;
    const cursor = input.selectionStart ?? bruto.length;
    const antes = bruto.slice(0, cursor);
    const digitosAntes = contarDigitos(antes);
    const formateado = formatearEntrada(bruto, this.maxDecimales, this.modo);

    if (formateado !== bruto) {
      let posicion = posicionPorDigitos(formateado, digitosAntes);
      if (formateado[posicion] === ',' && antes.includes(',')) posicion++;
      if (event.data === ',' || event.data === '.') {
        const coma = formateado.indexOf(',');
        if (coma >= 0) posicion = Math.max(posicion, coma + 1);
      }
      input.value = formateado;
      input.setSelectionRange(posicion, posicion);
    }

    this.valor = parsearNumeroEntrada(formateado);
    this.valorChange.emit(this.valor);
  }

  @HostListener('blur')
  alSalir(): void {
    this.enfocado = false;
    const input = this.el.nativeElement;
    const numero = parsearNumeroEntrada(input.value);
    this.valor = numero;
    this.valorChange.emit(numero);
    this.render(numero);
  }

  private get maxDecimales(): number {
    if (this.decimales != null) return this.decimales;
    return this.modo === 'monto' ? 2 : 3;
  }

  private render(numero: number | null = this.valor): void {
    const valor = numero == null ? 0 : numero;
    this.el.nativeElement.value =
      this.modo === 'monto' ? formatoBs(valor) : formatoCantidad(valor);
  }
}
