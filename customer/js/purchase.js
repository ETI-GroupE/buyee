const userId = sessionStorage.getItem("userId");
const ShopCartID = sessionStorage.getItem("ShopCartID")

fetch('https://buyee-purchase-history-1-nr7eovel5q-as.a.run.app/api/v1/allpurchase?UserID=1')
  .then(response => {
    console.log(response.status);
    return response.json();
  })
  .then(data => {

    console.log(data);
    data.forEach(itemId => {
    fetch('https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/products?product_id='+ itemId.product_id)
      .then(response => response.json())
      .then(data => {
        let table = document.getElementById("purchase-history-table");
        console.log(data)
      
        data.forEach(item => {
          // Create a new row element
          let row = table.insertRow();
    
          // Create cells for each item property
          let productImage = row.insertCell();
          let productName = row.insertCell();
          let productDescription = row.insertCell();
          let price = row.insertCell();
          let quantity = row.insertCell();
          let Total = row.insertCell();
            //https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/checkout
          // Set styles for each cell
          productImage.style.textAlign = "center";
          productName.style.textAlign = "center";
          productDescription.style.textAlign = "center";
          price.style.textAlign="center";
          quantity.style.textAlign = "center";
          Total.style.textAlign = "center";
        
          let formattedPrice = item.product_price.toFixed(2);
        let subTotalAmt = formattedPrice * itemId.quantity;
    
          // Populate the cells with item data
          productImage.innerHTML = "<img src='" + item.product_image_url + "'' text-align: center width='100' height='120'>";;
          productName.innerHTML = item.product_name;
          productDescription.innerHTML = item.product_description;
          price.innerHTML= "$" + item.product_price;
          quantity.innerHTML = itemId.quantity;
          Total.innerHTML = "$" + subTotalAmt.toFixed(2);
        });
        fetch('https://buyee-shoppingcart-gukqthlh4a-as.a.run.app/api/v1/checkout?ShopCartID=2')
        .then(response => {
            console.log(response.status);
            return response.json();
          }) 
          .then(data => {
            
            data.forEach(itemID => {
              let specificValue = 0;
              finalSubTotal = itemID.totalPayment;
              console.log("specific Value: " +finalSubTotal)
              let FinalAmt = document.getElementById("SubTotal")
            FinalAmt.style = "margin-top: 40px; text-align: right; font-size: 25px; color: black;";
            FinalAmt.innerHTML = "Sub Total : $"+ finalSubTotal.toFixed(2);
            });
            
          });
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });
