import { Component } from '@angular/core';
import { Hero } from "../../components/hero/hero";
import { About } from "../../components/about/about";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-home',
  imports: [Hero, About, Footer],
  templateUrl: './home.html',
  styleUrl: './home.sass'
})
export class Home {

}
