import { Component } from '@angular/core';
import { Speakerx9Card } from "./speakerx9-card/speakerx9-card";
import { Button } from "../../shared/button/button";

@Component({
  selector: 'app-home-products',
  imports: [Speakerx9Card, Button],
  templateUrl: './home-products.html',
  styleUrl: './home-products.sass'
})
export class HomeProducts {

}
