import {
  Component,
  ElementRef,
  signal,
  ViewChild,
  AfterViewInit,
  effect,
} from "@angular/core";

@Component({
  selector: "app-modal",
  standalone: true,
  template: `
    @if (open()) {
    <div class="fixed inset-0 bg-black/50" (click)="close()"></div>
    <div
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  bg-white rounded-lg shadow-lg p-4 max-w-lg w-full"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="labelId"
      tabindex="-1"
      #panel
    >
      <header id="{{ labelId }}" class="font-bold mb-2">
        <ng-content select="[header]"></ng-content>
      </header>
      <section class="mb-4"><ng-content /></section>
      <footer class="flex justify-end gap-2">
        <ng-content select="[footer]"></ng-content>
      </footer>
    </div>
    }
  `,
  styles: [``],
})
export class ModalComponent implements AfterViewInit {
  open = signal(false);
  labelId = `dlg_${crypto.randomUUID()}`;
  @ViewChild("panel") panel?: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    effect(() => this.open() && this.panel?.nativeElement.focus());
  }

  show() {
    this.open.set(true);
  }
  close() {
    this.open.set(false);
  }
}
