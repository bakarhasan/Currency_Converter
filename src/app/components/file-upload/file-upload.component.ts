import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  baseCurrency: string = 'USD'; // Default base currency
  targetCurrency: string = 'EUR'; // Default target currency
  amount: number = 1; // Default amount to convert
  convertedValue: number | null = null; // Holds the converted value
  exchangeRates: any = {}; // Holds the exchange rates
  currencies: { code: string; icon: string }[] = []; // Holds the list of all currencies with icons

  isHeaderHidden = false;
  lastScrollTop = 0;
  showConverter: boolean = false;
  // State variables for dropdown visibility
  showBaseCurrencyDropdown: boolean = false;
  showTargetCurrencyDropdown: boolean = false;
  constructor(private exchangeRateService: LoginService) { }


  hideShowContent() {
    this.showConverter = true;
  }

  ngOnInit(): void {
    this.getExchangeRates();
  }



  // Fetches the exchange rates
  getExchangeRates(): void {
    this.exchangeRateService.getRates(this.baseCurrency).subscribe((data) => {
      this.exchangeRates = data.conversion_rates;
      this.currencies = Object.keys(this.exchangeRates).map((currency) => ({
        code: currency,
        icon: `https://bakarhasan.github.io/Currency_Converter/assets/curruncy.jpg` // Use the path to your icons
      })); // List of currencies
    });
  }

  // Performs currency conversion
  convert(): void {
    if (this.amount && this.exchangeRates[this.targetCurrency]) {
      this.convertedValue = this.amount * this.exchangeRates[this.targetCurrency];
      this.showConvertedValue();
    }
  }
   // Inside your component class
showConvertedValue() {
  if (this.convertedValue !== null) {
      Swal.fire({
          title: 'Converted Value',
          text: `Converted Value: ${this.convertedValue} ${this.targetCurrency}`,
          icon: 'success',
          confirmButtonText: 'Okay',
          // Add animations
          backdrop: true,
          customClass: {
              popup: 'animated-popup' // Add a custom class for animation
          }
      });
  }
}

  // Set base currency and fetch exchange rates
  setBaseCurrency(currency: string): void {
    this.baseCurrency = currency;
    this.getExchangeRates();
    this.showBaseCurrencyDropdown = false; // Close the dropdown
  }

  // Set target currency
  setTargetCurrency(currency: string): void {
    this.targetCurrency = currency;
    this.showTargetCurrencyDropdown = false; // Close the dropdown
  }
  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const baseDropdown = document.getElementById('baseCurrencyDropdown');
    const targetDropdown = document.getElementById('targetCurrencyDropdown');

    // Close the base dropdown if clicked outside
    if (baseDropdown && !baseDropdown.contains(event.target as Node)) {
      this.showBaseCurrencyDropdown = false;
    }

    // Close the target dropdown if clicked outside
    if (targetDropdown && !targetDropdown.contains(event.target as Node)) {
      this.showTargetCurrencyDropdown = false;
    }
  }


}
