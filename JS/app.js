const loadProduct = () => {
    fetch("./product.json")
      .then((response) => response.json())
      .then((data) => displayProduct(data));
  };
  
  const displayProduct = (data) => {
    const cards = document.getElementById("cards");
    data.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card", "m-2");

      card.innerHTML = `
            <div class="bookmark-icon">
          
            <i class="fa-solid fa-bookmark"></i>
            <i onclick="handleBookmark('${product.id}','${product.name}','${product.price}')" class="fa-regular fa-bookmark"></i>
            
          </div>
          <div class="product-img-container">
            <img
              class="product-img"
              src=${product.image}
              alt=""
            />
          </div>
          <h3>${product.name}</h3>
          <p>The Widget 3000 is the latest and greatest in widget</p>
          <div class="priceAndButtons">
            <h2 class="text-primary">$${product.price}</h2>
            <button class="btn btn-primary">Buy Now</button>
          </div>
            `;
      cards.appendChild(card);
    });
  };
  
  // ! handle book mark

  const handleBookmark=(id,name,price)=>{
    // console.log('ID: '+id);
    // console.log('Name: '+name);
    // console.log('Price: '+price)
    const product={id,name,price}
    let Bookmark=[];

    const PreviousBookmark=JSON.parse(localStorage.getItem('myBooMarked'));
    if(PreviousBookmark){
        //console.log(PreviousBookmark)
        const isThisPRoductMarked=PreviousBookmark.find(pd=>pd.id===id)
        if(isThisPRoductMarked){
            Swal.fire({
                icon:"error",
                title: "Oops...",
                text:"Already bookdmarked",
                footer: "This Product Already Bookmarked"
            }
        )
           //alert('This Product Already Bookmarked')
        }else{
            console.log('This product not exists')
            Bookmark.push(...PreviousBookmark,product)
            localStorage.setItem('myBooMarked',JSON.stringify(Bookmark))
        }

    }else{
       Bookmark.push(product) 
       localStorage.setItem('myBooMarked',JSON.stringify(Bookmark))
    }
   
  }
  
  
  loadProduct();