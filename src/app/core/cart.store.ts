import { Injectable, computed, signal } from "@angular/core";
import { BehaviorSubject, interval, map } from "rxjs";

export interface Item {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: "root" })
export class CartStore {
  items = signal<Item[]>([]);
  total = computed(() => this.items().reduce((s, i) => s + i.price, 0));

  // Cold observable example: emits on subscription
  time$ = interval(1000).pipe(map((s) => new Date()));

  // Hot observable: BehaviorSubject shared across subscribers
  private msgSubject = new BehaviorSubject<string>("Welcome!");
  message$ = this.msgSubject.asObservable();

  add(item: Item) {
    this.items.update((list) => [...list, item]);
  }

  remove(id: number) {
    this.items.update((items) => items.filter((i) => i.id !== id));
  }

  setMessage(msg: string) {
    this.msgSubject.next(msg);
  }
}
