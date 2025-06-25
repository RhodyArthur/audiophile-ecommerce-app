import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Button } from "../../shared/button/button";

@Component({
  selector: 'app-hero',
  imports: [Button],
  templateUrl: './hero.html',
  styleUrl: './hero.sass'
})
export class Hero {
  
}
