import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'textarea[autoResize]',
})
export class AutoResizeDirective {
  constructor(private el: ElementRef<HTMLTextAreaElement>) {}

  ngAfterViewInit() {
    this.adjust();
  }

  @HostListener('input')
  adjust() {
    const textarea = this.el.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
