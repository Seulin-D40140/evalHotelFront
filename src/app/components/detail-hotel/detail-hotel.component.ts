import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/Models/Hotel.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-hotel',
  templateUrl: './detail-hotel.component.html',
  styleUrls: ['./detail-hotel.component.css']
})
export class DetailHotelComponent implements OnInit {

  hotel : Hotel | undefined;
  URLStr : string = '';

  constructor(private route : ActivatedRoute , private apiService : ApiServiceService) { }

  ngOnInit(): void 
  {
    const HotelId = this.route.snapshot.paramMap.get('id');
		if(HotelId) this.apiService.getHotel(+HotelId).subscribe(Hotel => this.hotel = Hotel);
    this.URLStr = environment.host;
  }

}
