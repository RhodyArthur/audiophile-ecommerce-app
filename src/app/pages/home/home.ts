import { Component } from '@angular/core';
import { Hero } from "../../components/hero/hero";
import { About } from "../../components/about/about";

@Component({
  selector: 'app-home',
  imports: [Hero, About],
  templateUrl: './home.html',
  styleUrl: './home.sass'
})
export class Home {

}
