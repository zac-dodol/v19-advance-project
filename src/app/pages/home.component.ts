import { Component, computed, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../shared/modal.component";
import { CartStore } from "../core/cart.store";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, ModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  messageSig;
  constructor(public cart: CartStore) {
    this.messageSig = toSignal(this.cart.message$, { initialValue: "" });
  }

  addItem() {
    this.cart.add({ id: Date.now(), name: "Item", price: 10 });
  }

  removeItem(id: number) {
    this.cart.remove(id);
  }
}
