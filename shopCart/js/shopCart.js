const userId = sessionStorage.getItem("userId");

fetch('https://buyee-discount-qqglc24h2a-as.a.run.app/api/v1/discounts')
  .then(response => response.json())
  .then(data => {
    // handle the data here
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
finalSubTotal = 0;
fetch('https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/shoppingCart?ShopCartID=1')
  .then(response => {
    console.log(response.status);
    return response.json();
  })
  .then(data => {

    // handle the data here
    console.log(data);
    data.forEach(itemId => {
      fetch('https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/products?product_id='+ itemId.productID)
        .then(response => response.json())
        .then(data => {
          let table = document.getElementById("shopping-cart-table");
          console.log(data)
          data.forEach(item => {
            // Create a new row element
            let row = table.insertRow();
      
            // Create cells for each item property
            let productImage = row.insertCell();
            let productName = row.insertCell();
            let price = row.insertCell();
            let quantity = row.insertCell();
            let subTotal = row.insertCell();

            // Set styles for each cell
            productImage.style.textAlign = "center";
            productName.style.textAlign = "center";
            price.style.textAlign = "center";
            quantity.style.textAlign = "center";
            subTotal.style.textAlign = "center";

            let formattedPrice = item.product_price.toFixed(2);
            let subTotalAmt = formattedPrice * itemId.quantity;
            finalSubTotal += subTotalAmt;
      
            // Populate the cells with item data
            productImage.innerHTML = "<img src='" + item.product_image_url + "'' text-align: center width='150' height='150'>";;
            productName.innerHTML = item.product_name;
            price.innerHTML = "$" + formattedPrice;
            quantity.innerHTML = itemId.quantity;
            subTotal.innerHTML = "$" + subTotalAmt.toFixed(2);
          });
          let delivery = document.getElementById("SubTotal");
          delivery.style = "margin-top: 40px; text-align: right; font-size: 25px; color: black;";
          delivery.innerHTML = "Sub Total : $"+ finalSubTotal.toFixed(2);
          
          sessionStorage.setItem("subTotal", finalSubTotal)
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    })
    .catch(error => {
    console.error('Error:', error);
  });

  const totalPayment = sessionStorage.getItem("subTotal");
  function checkout() {
    var emailAddress = document.getElementById("email").value;
    var shipping = document.getElementById("shipping")
    var postal = document.getElementById("postalCode")
    var creditCard = document.getElementById("creditCard")

    let postalCode = parseInt(postal);
    let creditCardNumber = parseInt(creditCard)

      const checkoutData = {
        "shopCartID": 1,
        "emailAddr": "testing@gmail.com",
        "shipping": "Ang Mo Kio",
        "postalCode": 123456,
        "creditCard": "1234567891011121",
        "totalPayment": 10.55
      };
      
      
      fetch('https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/checkout?ShopCartID=2')
      .then(response => response.json())
      .then(data => {
        // handle the data here
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      JSON.stringify(checkoutData)
      console.log(checkoutData)

      fetch('http://localhost:5000/api/v1/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          checkoutData
        )
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }


//   fetch('https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/shoppingCart?ShopCartID=1',{
//   method : "GET",
//   mode: "cors",
//   headers: {}
// })
//   .then(response => response.json())
//   .then(data => {
//     // handle the data here
//     console.log(data);

//     // Get the table element
//     let table = document.getElementById("shopping-cart-table");

//     // Iterate over the data array
//     data.forEach(item => {
//       // Create a new row element
//       let row = table.insertRow();

//       // Create cells for each item property
//       let userIDCell = row.insertCell();
//       let shopCartIDCell = row.insertCell();
//       let isCheckoutCell = row.insertCell();

//       // Populate the cells with item data
//       userIDCell.innerHTML = item.UserID;
//       shopCartIDCell.innerHTML = item.ShopCartID;
//       isCheckoutCell.innerHTML = item.IsCheckout;
//     });
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });