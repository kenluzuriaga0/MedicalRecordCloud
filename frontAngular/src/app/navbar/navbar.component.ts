import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor() { }

  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {
              label: 'Proyecto Cloud',
          }
      ];
  }

  showMembers(){
    Swal.fire({
      title: '<strong>Integrantes G-7</strong>',
      icon: 'info',
      html:
        '<ul style="font-weight:bolder">'+
        '<li>Ken Luzuriaga</li> <li>Keneth Sabando</li>'+
        '<li>Freya Sabando</li> <li>Anthony Galarza</li> </ul>',
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> OK!'
    })
  }

}
