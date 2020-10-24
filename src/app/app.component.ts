import { Component } from "@angular/core";
import { Card } from "./Card";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  cards: Card[] = [];

  onChangeTheme(theme: string): void {
    console.log("AppComponent -> onChangeTheme -> theme", theme);
  }
}
