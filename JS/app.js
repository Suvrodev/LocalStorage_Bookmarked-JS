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
      const isBookmarked=CheckBookmark(product.id);
      if(isBookmarked===true){
        card.innerHTML = `
        <div class="bookmark-icon">
      
        <i onclick="handleRemoveBookmarked('${product.id}')" class="fa-solid fa-bookmark"></i>

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
      }else{
        card.innerHTML = `
        <div class="bookmark-icon">
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
      }
    //   card.innerHTML = `
    //         <div class="bookmark-icon">
          
    //         <i onclick="handleRemoveBookmarked('${product.id}')" class="fa-solid fa-bookmark"></i>
    //         <i onclick="handleBookmark('${product.id}','${product.name}','${product.price}')" class="fa-regular fa-bookmark"></i>
            
    //       </div>
    //       <div class="product-img-container">
    //         <img
    //           class="product-img"
    //           src=${product.image}
    //           alt=""
    //         />
    //       </div>
    //       <h3>${product.name}</h3>
    //       <p>The Widget 3000 is the latest and greatest in widget</p>
    //       <div class="priceAndButtons">
    //         <h2 class="text-primary">$${product.price}</h2>
    //         <button class="btn btn-primary">Buy Now</button>
    //       </div>
    //         `;
    //   cards.appendChild(card);
    });
  };
  
  // ! handle book mark

  const handleBookmark=(id,name,price)=>{
    // console.log('ID: '+id);
    // console.log('Name: '+name);
    // console.log('Price: '+price)
    const product={id,name,price,bookmark: true}
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

  const handleRemoveBookmarked=(id)=>{
    console.log('id: '+id)
    const PreviousBookmark=JSON.parse(localStorage.getItem('myBooMarked'));
    console.log(PreviousBookmark)
    // console.log(typeof PreviousBookmark)
    if(PreviousBookmark){
        const isThisPRoductMarked=PreviousBookmark.find(pd=>pd.id===id)
        if(isThisPRoductMarked){
            const restOfThem=PreviousBookmark.filter(product=>product.id!==id)
            console.log('Rest of Them: ')
            console.log(restOfThem)
            localStorage.setItem('myBooMarked',JSON.stringify(restOfThem))
        }else{
            Swal.fire({
                icon:"error",
                title: "Oops...",
                text:"This Product is not available in bookmarked"
            })
        }
    }else{
        Swal.fire({
            icon:"error",
            title: "Oops...",
            text:"There is no bookmarked"
        })
    }
  }

  const CheckBookmark=id=>{
    const PreviousBookmark=JSON.parse(localStorage.getItem('myBooMarked'));
    if(PreviousBookmark){
        const isThisPRoductMarked=PreviousBookmark.find(pd=>pd.id==id)
        if(isThisPRoductMarked){
            console.log(id," is Bookmarked")
            return true;
        }else{
            console.log(id," is not Bookmarked")
           return false;
        }
    }
  }
  
  
  loadProduct();