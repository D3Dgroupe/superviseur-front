import { Component } from '@angular/core';
import { NavigationComponent } from "../../navigation/navigation.component";

@Component({
    selector: 'app-internal-server',
    standalone: true,
    templateUrl: './internal-server.component.html',
    styleUrl: './internal-server.component.scss',
    imports: [NavigationComponent]
})

export class InternalServerComponent {

}
