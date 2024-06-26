const homecooks = [{
    id: 1,
    name: "Jyoti Yadav",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/3d9831ea70cfab526f30009f0ef640ed-removebg-preview.avif",
    foodType: "Rajasthani thali",
    quote: "Savor the rich and aromatic flavors of North Indian and Mughlai cuisine",
    rating: 4.5,
    feeds: 15,
    noOfOrders: 68,
    minPrice: 59,
    healthyPick: false,
    veg: true,
    spicy: false,
    dairyFree: false,
    dateOfJoining: "2022-09-25",
    subscriptionCost: 3000,
    dishes: [{
        name: "Idli sambar and coconut chutney",
        description: "A South Indian trio that brings together fluffy rice cakes, flavorful lentil stew, and creamy coconut chutney. A symphony of tastes in every bite!",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/3ad5b61d118fd588/1360x964cq70/idli-sambar-and-coconut-chutney-recipe-main-photo.webp",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Upma with chutney and sambar",
        description: "A South Indian delight that harmonizes the wholesome goodness of semolina, zesty chutney, and flavorful sambar. A taste of comfort and tradition in every mouthful!",
        price: 28,
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/8/86/A_photo_of_Upma.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Aloo Paratha and Tomato Chutney",
        description: "Crispy, golden parathas embrace a spiced potato filling, while the tangy tomato chutney adds a delightful twist. A delectable combination that's sure to satisfy your cravings.",
        price: 28,
        imgURL: "https://i0.wp.com/aartimadan.com/wp-content/uploads/2023/03/vrat-ka-aloo-paratha.jpg?w=800&ssl=1",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Puri with Aloo Sabji",
        description: "Crispy, fluffy, and satisfying, paired with a flavorful potato curry. A symphony of textures and flavors to tantalize your taste buds.",
        price: 28,
        imgURL: "https://www.chefkunalkapur.com/wp-content/uploads/2021/05/Aloo-Puri-Bhaji.jpg?v=1620385178",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Poha",
        description: "Fluffy flattened rice sautéed with spices, herbs, and a hint of lemon, offering a delightful and quick Breakfast option with a burst of flavors.",
        price: 28,
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2020/12/Poha-Recipe-indori-Piping-Pot-Curry-1024x1024.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Dosa",
        description: " South India's crispy marvel, a thin, golden delight that pairs perfectly with spiced potatoes. A tasty crunch in every bite.",
        price: 28,
        imgURL: "https://homechefscooking.files.wordpress.com/2017/12/filmora.png",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Moong Dal Chilla",
        description: "Wholesome and savory, these lentil pancakes are a healthy, protein-packed delight, perfect for a satisfying Breakfast or snack.",
        price: 28,
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2022/12/moong-dal-chilla-recipe-Piping-Pot-Curry-768x768.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Paneer Butter Masala with Chapattis",
        description: "Paneer cubes simmered in a rich tomato-based gravy with a hint of cream and aromatic spices. Served with soft chapattis. A North Indian favorite that's indulgent and satisfying.",
        price: 48,
        imgURL: "https://www.spiceindiaonline.com/wp-content/uploads/2021/02/Easy-Paneer-Butter-Masala-3-500x375.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Mutton Biryani",
        description: "Fragrant basmati rice cooked with tender mutton pieces and aromatic spices. A delicious and aromatic biryani. Served with raita and salad.",
        price: 60,
        imgURL: "https://paattiskitchen.com/wp-content/uploads/2023/03/kmc_20230323_230743-1024x576.jpg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Palak Paneer with Roti",
        description: "Cubes of paneer in a creamy spinach gravy, seasoned with Indian spices. Served with soft rotis. A wholesome and vegetarian delight that's rich in flavor and nutrients.",
        price: 42,
        imgURL: "https://cdn.squats.in/thumbnail/5a395a00-cff8-469f-a4a1-eb8588d19c4a.jpeg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Vegetable Pulao with Raita",
        description: "Fragrant basmati rice cooked with a medley of vegetables and aromatic spices. Served with cooling raita. A vegetarian pulao that's both flavorful and satisfying.",
        price: 45,
        imgURL: "https://www.vidhyashomecooking.com/wp-content/uploads/2020/09/VegPulao.webp",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Aloo Gobi with Parathas",
        description: "A comforting blend of potatoes and cauliflower, sautéed with spices and herbs. Served with fresh, hot parathas. A homely and satisfying dish that's full of flavor.",
        price: 38,
        imgURL: "https://lh3.googleusercontent.com/g4sB_w3iSRD29-b3ZJTWh0Up3yYFyInpxTAWAlbH6TN5dIwL_vv3R_V_-X4Op2Tpmwi2jtwzrEeFjlhHTV8oLcyMsH2gut8I3dxX_X0=w512-rw",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Tandoori Chicken with Rice",
        description: "Chicken marinated in yogurt and spices, cooked to perfection in a tandoor. Served with fragrant basmati rice, naan, and a side of mint chutney. A smoky and flavorful dish that's a delight for meat lovers.",
        price: 55,
        imgURL: "https://img.taste.com.au/rqiE1KpD/w720-h480-cfill-q80/taste/2016/11/tandoori-chicken-with-basmati-rice-104271-1.jpeg",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Veg Biryani with Raita",
        description: "Fragrant basmati rice cooked with a medley of vegetables and aromatic spices. Served with cooling raita. A vegetarian biryani that's a burst of flavors and textures.",
        price: 48,
        imgURL: "https://img-global.cpcdn.com/recipes/74bc670d9918e7b8/680x482cq70/veg-hyderabadi-biryani-with-boondi-raita-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Butter Chicken with Naan",
        description: "Tender chicken pieces simmered in a rich tomato-based gravy with a hint of cream and aromatic spices. Served with soft naan. A North Indian classic that's indulgent and savory.",
        price: 50,
        imgURL: "https://www.missionfoods.com/wp-content/uploads/2022/06/easy-butter-chicken-naan-1024x683.jpg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Mixed Vegetable Curry with Roti",
        description: "A flavorful medley of mixed vegetables in a spiced curry. Served with soft rotis. A wholesome vegetarian meal that's perfect for Lunch.",
        price: 40,
        imgURL: "https://www.cookingandme.com/wp-content/uploads/2012/12/8234784286_ee408b27e6_z1.webp",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Veg Fried Rice with Manchurian",
        description: "Fragrant fried rice, accompanied by vegetable Manchurian. A delightful fusion of Indian and Chinese flavors.",
        price: 48,
        imgURL: "https://www.nehascookbook.com/wp-content/uploads/2022/10/Fried-rice-lobi-manchurian-WS-768x432.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dal Tadka with Jeera Rice",
        description: "Yellow lentils cooked with spices and tempered with aromatic ghee. Served with cumin-flavored rice. A comforting and satisfying vegetarian meal.",
        price: 38,
        imgURL: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F8c0ef296153b3b754f5770623631eff2.cdn.bubble.io%2Ff1597941414091x788717463110555500%2FJeera%2520Rice%2520and%2520Dal%2520Fry.jpg?w=1024&h=&auto=compress&dpr=1.25&fit=max",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Fish Curry with Steamed Rice",
        description: "Fish cooked in a spicy and tangy curry, served with steamed rice. A coastal delight for seafood enthusiasts.",
        price: 55,
        imgURL: "https://paattiskitchen.com/wp-content/uploads/2023/01/kmc_20230110_142103-1-1200x675.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Malai Kofta with Chapattis",
        description: "Deep-fried paneer and vegetable dumplings served in a creamy and rich cashew-based gravy, flavored with aromatic spices along with chapattis",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/8d6f90118e354b90/680x482cq70/malai-kofta-and-tandoori-roti-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dal Makhni with naan",
        description: "A creamy and flavorful lentil curry made with a combination of black lentils (urad dal) and kidney beans (rajma), simmered in a rich tomato-based gravy with aromatic spices.",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/549969a2accee087/1360x964cq70/dal-makhni-with-garlic-naan-recipe-main-photo.webp",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: "2",
    name: "Aisha Khan",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/360_F_226357770_cMpMAH76wCOIs1uwURL0BXMWlspPyBGQ-removebg-preview-removebg-preview.avif",
    foodType: "North indian, Punjabi",
    quote: "Crafting flavors with love and passion",
    rating: 4.1,
    feeds: 5,
    noOfOrders: 68,
    minPrice: 65,
    healthyPick: true,
    veg: false,
    spicy: true,
    dairyFree: false,
    dateOfJoining: "2022-08-25",
    subscriptionCost: 3200,
    dishes: [{
        name: "Aloo Paratha",
        description: "Flatbread stuffed with a spiced potato mixture, served with yogurt and butter.",
        price: 28,
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg/640px-Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Poha",
        description: "A light and wholesome dish made with flattened rice, onions, peanuts, and spices.",
        price: 28,
        imgURL: "https://www.indianveggiedelight.com/wp-content/uploads/2022/07/poha-recipe-featured.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Amritsari Kulcha",
        description: "Flatbread stuffed with a spiced potato filling, served with chole (spicy chickpeas).",
        price: 28,
        imgURL: "https://static.toiimg.com/thumb/62376759.cms?width=1200&height=900",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Gobhi Paratha",
        description: "Flatbread stuffed with spiced cauliflower.",
        price: 28,
        imgURL: "https://cdn.cdnparenting.com/articles/2020/04/24161922/Gobi-Cauliflower-Paratha-Recipe.webp",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Stuffed Besan Cheela",
        description: "Savory pancakes with a spiced paneer filling.",
        price: 28,
        imgURL: "https://www.sinamontales.com/dotcord/uploads/2016/06/paneer-stuffed-besan-chilla-stuffed-savory-lentil-crepes.1024x1024-4.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Lassi and Masala Omelet",
        description: "Sweetened yogurt drink paired with a spiced omelet.",
        price: 28,
        imgURL: "https://www.yummytummyaarthi.com/wp-content/uploads/2016/10/1-1.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Puri Halwa",
        description: "Deep-fried puffy bread served with a sweet semolina pudding.",
        price: 28,
        imgURL: "https://soyummyrecipes.com/wp-content/uploads/2020/12/Halwa-Puri-2.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Chana Masala with Basmati Rice",
        description: "Spicy chickpea curry served with aromatic basmati rice. Include a side of curd or raita.",
        price: 48,
        imgURL: "https://www.connoisseurusveg.com/wp-content/uploads/2023/04/chana-masala-sq.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Rajma Chawal with Curd/Raita",
        description: "Kidney beans in a savory curry, served with basmati rice and a side of curd or raita.",
        price: 60,
        imgURL: "https://d3gy1em549lxx2.cloudfront.net/3a6f9ed4-c34f-4e6b-a865-ea478283bbb5.jpeg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kadhi Pakora with Rice",
        description: "Yogurt-based curry with gram flour dumplings, served with rice. Include a side of raita.",
        price: 42,
        imgURL: "https://img-global.cpcdn.com/recipes/8d4b14d120042a09/1200x630cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Sarson Ka Saag with Makki Di Roti and Raita",
        description: "Mustard greens curry with cornflour flatbread and a side of curd or raita.",
        price: 45,
        imgURL: "https://img-global.cpcdn.com/recipes/7ff540a98240391c/400x400cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Bharwan Baingan with Rice",
        description: "Stuffed eggplants in a tangy gravy served with rice. Include a side of curd or raita.",
        price: 38,
        imgURL: "https://i0.wp.com/thefoodsamaritan.com/wp-content/uploads/2016/05/IMG_1048.jpg?resize=1024%2C683",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Baingan Bharta with Roti and Raita",
        description: "Roasted and mashed eggplant served with whole-wheat roti and a side of curd or raita.",
        price: 55,
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2022/11/Baingan-Bharta-Recipe-Piping-Pot-Curry.--500x500.jpg",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Mixed Vegetable Curry with Rice and Raita",
        description: "A medley of vegetables served with rice and a side of curd or raita.",
        price: 48,
        imgURL: "https://meatfreemondays.com/wp-content/uploads/2020/01/Vegetable-Curry-with-Raita-RS-N.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Saag Paneer with Roti",
        description: "Creamy spinach with paneer, served with whole wheat roti.",
        price: 50,
        imgURL: "https://images.fittrapi.com/tr:w-1024,pr-true,q-60/5a395a00-cff8-469f-a4a1-eb8588d19c4a.jpeg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Butter Chicken (Murgh Makhani) with Naan",
        description: "Rich chicken in a buttery tomato sauce, perfect with fluffy naan.",
        price: 40,
        imgURL: "https://www.missionfoods.com/wp-content/uploads/2022/06/easy-butter-chicken-naan-1024x683.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dal Makhani with Roti ",
        description: "Creamy lentils with whole wheat roti.",
        price: 48,
        imgURL: "https://www.kannammacooks.com/wp-content/uploads/dal-makhani-recipe-cream-1-3.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Tandoori Chicken with Naan",
        description: "Yogurt and spice marinated chicken served with naan.",
        price: 38,
        imgURL: "https://10play.com.au/ip/s3/2021/04/26/d1025c69d859472304e1746d2ea99019-1051597.jpg?image-profile=image_max&io=landscape",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Punjabi Chole Bhature",
        description: "Spicy chickpea curry served with deep-fried, fluffy bread.",
        price: 55,
        imgURL: "https://media.vogue.in/wp-content/uploads/2020/08/chole-bhature-recipe.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Amritsari Machli with Rice",
        description: "Crispy, batter-fried fish with basmati rice.",
        price: 35,
        imgURL: "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/amritsari-fried-fish-scaled-e1621348565229.jpeg?v=1618226070",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Shahi Paneer with Naan",
        description: "Rich and creamy paneer with naan.",
        price: 35,
        imgURL: "https://thisthatmore.blog/wp-content/uploads/2019/06/IMG_4921-1024x683.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: 3,
    name: "Nandini Verma",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/8477ee262de33852e3d7de4081c6b282-removebg-preview.avif",
    foodType: "North indian, Hariyanvi",
    quote: "Indulge in the essence of homemade delicacies",
    rating: 4.2,
    feeds: 5,
    noOfOrders: 45,
    minPrice: 99,
    healthyPick: true,
    veg: true,
    spicy: false,
    dairyFree: true,
    dateOfJoining: "2022-12-12",
    subscriptionCost: 3100,
    dishes: [{
        name: "Mithe Chawal (Sweet Rice)",
        description: "Flavored rice cooked with saffron, nuts, and a touch of sweetness.",
        price: 28,
        imgURL: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Hina_Gujral/Meethe_Chawal_Recipe_Zarda_Pulao_400.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Bajra Aloo Paratha",
        description: "Flatbread stuffed with pearl millet and spiced potato filling.",
        price: 28,
        imgURL: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Farrukh_Aziz_Ansari/Bajra_Aloo_Paratha.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Besan Masala Roti",
        description: "Flatbread made with gram flour and spices, served with yogurt.",
        price: 28,
        imgURL: "https://images.slurrp.com/prod/articles/l3i3l25dhw7.webp",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Dalia Khichdi",
        description: "Savory porridge made with cracked wheat (dalia), vegetables, and spices.",
        price: 28,
        imgURL: "https://www.whiskaffair.com/wp-content/uploads/2021/01/Daliya-Khichdi-2-6.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Methi Paratha",
        description: "Flatbread with a flavorful fenugreek leaf filling.",
        price: 28,
        imgURL: "https://www.whiskaffair.com/wp-content/uploads/2020/04/Methi-Paratha-3-500x500.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Poha",
        description: "Light and wholesome dish made with flattened rice, onions, peanuts, and spices.",
        price: 28,
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2020/12/Poha-Recipe-indori-Piping-Pot-Curry-1024x1024.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Churma",
        description: "Traditional sweet dish made with crumbled roti, ghee, and jaggery or sugar.",
        price: 28,
        imgURL: "https://vegecravings.com/wp-content/uploads/2016/03/churma-step-by-step-recipe-1024x878.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Gajar Methi Sabzi with Roti and Raita",
        description: "Carrots and fenugreek leaves cooked in a spiced tomato-onion base, served with whole wheat roti and curd or raita.",
        price: 48,
        imgURL: "https://mycookingjourney.com/wp-content/uploads/2014/04/Haryana-Besan-Masala-roti-with-Gajar-methi-subzi-%2828%29-1024x768.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kadhi Pakora with Rice and Raita",
        description: "Yogurt-based curry with gram flour dumplings, served with rice and a side of curd or raita.",
        price: 60,
        imgURL: "https://img-global.cpcdn.com/recipes/5ade4167c6629cda/680x482cq70/kadhi-pakoda-with-boiled-rice-recipe-main-photo.jpg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Mixed Dal with Rice and Raita",
        description: "A hearty mix of lentils cooked with spices, served with rice and curd or raita.",
        price: 42,
        imgURL: "https://img-global.cpcdn.com/recipes/7fa1c0d0929ff581/680x482cq70/lunch-platter-sabji-dal-raita-rice-papad-roti-salad-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kachri ki Sabzi with Roti and Raita",
        description: "Dried, wild cucumber cooked in a tangy spice mix, served with roti and curd or raita.",
        price: 45,
        imgURL: "https://img-global.cpcdn.com/recipes/112261f964f504af/1200x630cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Singri ki Sabzi with Bajra Roti and Raita",
        description: "Dried beans and berries in a tangy gravy, enjoyed with pearl millet roti (bajra roti) and a side of raita.",
        price: 38,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7w63XJ1xYyV1_gM-VFMtjPoHFQgXtUO9Q8g&usqp=CAU",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Gobhi Matar with Rice and Raita",
        description: "Cauliflower and peas in a spiced tomato gravy, with basmati rice and curd or raita.",
        price: 55,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIqAGo1bsrk3AYgFjC9S3Sj3WRZOQXYUUedA&usqp=CAU",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kadhi Pakora with Rice and Raita",
        description: "Yogurt-based curry with gram flour dumplings, served with rice and a side of curd or raita.",
        price: 48,
        imgURL: "https://img-global.cpcdn.com/recipes/5ade4167c6629cda/680x482cq70/kadhi-pakoda-with-boiled-rice-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Hara Chana Masala with Rice",
        description: "Fresh green chickpeas cooked in a savory, spicy gravy, served with basmati rice.",
        price: 50,
        imgURL: "https://www.usfoods.com/content/usfoods-dce/en/great-food/recipes/chana-masala/_jcr_content/recipe-header/image.img.jpg/1645652021787.jpg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Bhindi Masala with Roti",
        description: "Okra (bhindi) cooked in a flavorful onion-tomato base and spices, served with whole wheat roti.",
        price: 40,
        imgURL: "https://static.toiimg.com/thumb/53227232.cms?imgsize=280291&width=800&height=800",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Bathua Raita with Roti",
        description: "Yogurt-based dip with fresh bathua greens (Chenopodium), served with roti.",
        price: 48,
        imgURL: "https://www.temptingtreat.com/wp-content/uploads/2020/04/F-2.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Gatte ki Sabzi with Rice",
        description: "Gram flour dumplings in a yogurt-based, spiced gravy, served with basmati rice.",
        price: 38,
        imgURL: "https://media-cdn.tripadvisor.com/media/photo-s/06/52/68/c8/rice-with-gatte-ki-sabzi.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Palak Paneer with Roti",
        description: "Creamy spinach with paneer, served with whole wheat roti",
        price: 55,
        imgURL: "https://preview.redd.it/d8ydi58hukp81.jpg?width=640&crop=smart&auto=webp&s=cc036761df387805244f1ecd204f387a7966af49",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Baingan Bharta with Roti",
        description: "Roasted and mashed eggplant, with whole-wheat roti.",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/9e865d6ad3a18e55/680x482cq70/%E0%A4%AE%E0%A4%B8%E0%A4%B8-%E0%A4%B0%E0%A4%9F-%E0%A4%B5%E0%A4%A6-%E0%A4%AC%E0%A4%97%E0%A4%A8-%E0%A4%AD%E0%A4%B0%E0%A4%A4-missi-roti-with-baingan-bharta-recipe-in-hindi-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Besan Gatta Curry with Roti",
        description: "Gram flour dumplings in a tangy yogurt gravy, with whole wheat roti.",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/e14d040e02006f88/680x482cq70/besan-gatta-curry-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: 4,
    name: "Lakshmi Patel",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/18604cbbd8afcdb92239853c06b78172-removebg-preview.avif",
    foodType: "Biryani, Rajasthani",
    quote: "Authentic homemade flavors delivered with love",
    rating: 4.5,
    feeds: 5,
    noOfOrders: 153,
    minPrice: 88,
    healthyPick: false,
    veg: true,
    spicy: true,
    dairyFree: false,
    dateOfJoining: "2024-01-25",
    subscriptionCost: 3000,
    dishes: [{
        name: "Bajre ki Raab",
        description: "A warm and nourishing porridge made with pearl millet flour, buttermilk, and spices.",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/4e3d922e0cf49c53/680x482cq70/%E0%A4%AC%E0%A4%9C%E0%A4%B0-%E0%A4%95-%E0%A4%B0%E0%A4%AC-bajre-ka-raab-recipe-in-hindi-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Moong Dal Chilla",
        description: "Savory pancakes made with a spiced moong dal (yellow lentil) batter.",
        price: 28,
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2022/12/moong-dal-chilla-recipe-Piping-Pot-Curry.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Pyaz Kachori",
        description: "Deep-fried, flaky pastry filled with a spicy onion mixture.",
        price: 28,
        imgURL: "https://static.toiimg.com/thumb/59606392.cms?imgsize=319995&width=800&height=800",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Methi Bajra Poori",
        description: "Deep-fried bread made with pearl millet flour and fenugreek leaves.",
        price: 28,
        imgURL: "https://maayeka.com/wp-content/uploads/2013/02/methi-bajra-poori.jpg.webp",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Besan ka Cheela",
        description: "Savory pancakes made with gram flour (besan), yogurt, and spices.",
        price: 28,
        imgURL: "https://www.indianveggiedelight.com/wp-content/uploads/2022/12/besan-chilla-recipe-featured.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Mirchi Vada",
        description: "Large green chilies stuffed with a spiced potato filling and batter-fried.",
        price: 28,
        imgURL: "http://www.yummyfoodrecipes.in/resources/picture/org/Mirchi-Vada.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Mawa Kachori",
        description: "Pastry filled with sweetened khoya (reduced milk solids) and nuts.",
        price: 28,
        imgURL: "https://www.chefkunalkapur.com/wp-content/uploads/2021/10/3F3A0442-scaled-e1635216440410.jpg?v=1635215396",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Dal Baati Churma",
        description: "The quintessential Rajasthani dish! Hard wheat rolls (baati) baked traditionally in a pit, served with panchmel dal (mix of five lentils) and sweet churma (crumbled sweet bread).",
        price: 48,
        imgURL: "https://www.secondrecipe.com/wp-content/uploads/2020/11/dal-bati-churma.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Rajasthani Kadhi with Rice",
        description: "Flavorful yogurt-based spiced curry with gram flour dumplings (pakoras), served with steamed rice.",
        price: 60,
        imgURL: "https://thefoodscape.files.wordpress.com/2016/04/img_05751.jpg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Panchkuta Sabzi",
        description: "A unique dish blending five desert vegetables in a spiced preparation. Serve with roti or rice.",
        price: 42,
        imgURL: "https://images.slurrp.com/prodrich_article/ezvn9smbmke.webp?impolicy=slurrp-20210601&width=880&height=500",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Guvar Phali ki Sabzi with Rice",
        description: "Cluster beans in a tangy and flavorful gravy, enjoyed with rice.",
        price: 45,
        imgURL: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/sibyl-archanaskitchen.com/Gawar_Phali_Methi_Ki_Sabzi_Recipe_.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Papad Mangodi ki Sabzi with Rice",
        description: "A lentil and sun-dried papad (spicy wafers) curry with tangy dried mango, served with rice.",
        price: 38,
        imgURL: "https://i0.wp.com/www.blissofcooking.com/wp-content/uploads/2017/01/Papad-Mangodi-Ki-Sabzi-Feature.jpg?w=960&ssl=1",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Laal Maas with Rice",
        description: "A fiery mutton curry (substitute soy chunks or paneer for a vegetarian version), enjoyed with rice.",
        price: 55,
        imgURL: "https://bespoketraveler.files.wordpress.com/2015/10/laal-maas-view.jpg?w=695&h=463",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Ghevar",
        description: "A sweet disc-shaped delicacy made with flour, soaked in sugar syrup. (Enjoy as a special treat)",
        price: 48,
        imgURL: "https://www.cookforindia.com/wp-content/uploads/2016/08/ghevar.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Ker Sangri ki Sabzi with Bajra Roti",
        description: "Dried beans and berries cooked in a tangy and flavorful gravy. Enjoy with pearl millet roti.",
        price: 50,
        imgURL: "https://ishitarc1908.files.wordpress.com/2016/07/img_20160118_143009661_hdr.jpg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Gatte ki Sabzi with Roti",
        description: "Besan (gram flour) dumplings simmered in a rich, yogurt-based gravy, perfectly paired with roti.",
        price: 40,
        imgURL: "https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/sheetal-pandey20180426234034371.jpeg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Matar Paneer with Roti",
        description: "Green peas and paneer cubes cooked in a creamy tomato-based gravy, served with roti.",
        price: 48,
        imgURL: "https://www.sanjanafeasts.co.uk/wp-content/uploads/2018/05/Creamy-Restaurant-Style-Matar-Paneer-1-1024x683.jpg.webp",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Bhindi Masala with Roti",
        description: "Okra cooked in a traditional Rajasthani spice blend, paired with roti.",
        price: 38,
        imgURL: "https://static.toiimg.com/thumb/53227232.cms?imgsize=280291&width=800&height=800",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Aloo Methi Sabzi with Roti",
        description: "Simple yet delicious curry of potatoes and fenugreek leaves, paired with roti.",
        price: 55,
        imgURL: "https://img-global.cpcdn.com/recipes/2daf06e92de967c0/680x482cq70/%E0%A4%86%E0%A4%B2-%E0%A4%AE%E0%A4%A5-aloo-methi-ki-recipe-in-hindi-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dahi Bhindi with Roti",
        description: "Okra cooked in a creamy yogurt-based gravy, enjoyed with roti.",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/8a38bd481512ed73/680x482cq70/%E0%A4%A6%E0%A4%B9-%E0%A4%AD%E0%A4%A1-%E0%A4%94%E0%A4%B0-%E0%A4%AE%E0%A4%B2%E0%A4%9F%E0%A4%97%E0%A4%B0%E0%A4%A8-%E0%A4%B0%E0%A4%9F-dahi-bhindi-aur-multigrain-roti-recipe-in-hindi-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Chana Masala with Roti",
        description: "Hearty, spiced chickpea curry served with roti",
        price: 35,
        imgURL: "https://i0.wp.com/gomathirecipes.com/wp-content/uploads/2022/08/3298.jpg?fit=1200%2C800&ssl=1",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: 5,
    name: "Sakshi Iyer",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/Indian-Dish-Malai-Kofta-removebg-preview-removebg-preview.avif",
    foodType: "Bengali",
    quote: "Unleashing flavors that ignite your taste buds",
    rating: 4.2,
    feeds: 20,
    noOfOrders: 48,
    minPrice: 75,
    healthyPick: true,
    veg: false,
    spicy: true,
    dairyFree: true,
    dateOfJoining: "2022-07-15",
    subscriptionCost: 3400,
    dishes: [{
        name: "Luchi and Alur Dom",
        description: "Fluffy, deep-fried flatbreads (luchi) served with a simple and comforting potato curry (alur dom).",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/975266133b0afea9/400x400cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Radhaballavi and Cholar Dal",
        description: "Stuffed lentil flatbread (radhaballavi) accompanied by a mildly spiced cholar dal.",
        price: 28,
        imgURL: "https://babumoshai.org/wp-content/uploads/2022/05/rc-768x581.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Muri Ghonto",
        description: "A quick and comforting puffed rice dish flavored with fish, coconut, and vegetables.",
        price: 28,
        imgURL: "https://www.licious.in/blog/wp-content/uploads/2020/12/Muri-Ghonto-750x750.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Koraishutir Kochuri and Aloor Torkari",
        description: "Flaky flatbreads stuffed with green peas (koraishutir kochuri) served with a spicy potato curry (aloor torkari).",
        price: 28,
        imgURL: "https://4.bp.blogspot.com/-g15x29hgLKM/UTUVEcyegBI/AAAAAAAAJwc/VHgjm2XRIc4/s1600/644670_10151258531771736_1196157466_n%255B1%255D.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Doodh Poha",
        description: "Flattened rice softened in milk with sugar and nuts, a simple and delicious start to the day.",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/c576289703b55979/680x482cq70/poha-kheer-doodh-poha-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Vegetable Chop with Ghugni",
        description: "Spiced vegetable croquettes paired with dried yellow peas in a flavorful curry.",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/3945c0d52e48e15b/680x482cq70/aloo-chop-and-ghugni-recipe-main-photo.webp",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Mishti Doi",
        description: "Sweetened, set yogurt - a staple Bengali dessert for breakfast.",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/a554dbdc8d6a43fc/1200x630cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Shukto with Rice",
        description: "A medley of bitter and sweet vegetables cooked in a lightly spiced sauce, served with a mound of steamed rice.",
        price: 48,
        imgURL: "https://aahaaramonline.com/wp-content/uploads/2016/10/Shukto_Bengali_Recipe-1024x768.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Macher Jhol with Rice",
        description: "Bengali-style fish curry with potatoes in a light, flavorful broth, a classic with rice.",
        price: 60,
        imgURL: "https://1.bp.blogspot.com/-xIoxV6sZYko/VvwXWqhV3oI/AAAAAAAAG8s/sLKhfrxvo2w3GHMH-mjA-nad_gomgHA4Q/s640/mulo-diye-macher-jhol12.jpg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Chhanar Dalna with Rice",
        description: "Soft paneer cubes in a fragrant, spiced gravy, best enjoyed with rice.",
        price: 42,
        imgURL: "https://1.bp.blogspot.com/-jNw8Jj0UPrc/XxMG9HZm_7I/AAAAAAAAK-c/3xvcipmnSdsdRv82zKtGA5_5fnnJQT7yACLcBGAsYHQ/s1600/Chanar%2BDalna.JPG",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Moong Dal with Rice and Begun Bhaja",
        description: "Yellow lentil dal with fried eggplant slices, served with rice for a wholesome meal.",
        price: 45,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBciHPKr6lv8uT66sqlYrb6mkZzdYLhIPTM7G6Vg-ZOcl411xJxOPS5tqmmx3eFsCdNTc&usqp=CAU",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Maach Bhaja with Rice and Dal",
        description: "Pan-fried fish with simple lentil dal and steamed rice.",
        price: 38,
        imgURL: "https://rumkisgoldenspoon.com/wp-content/uploads/2022/07/Ilish-mach-bhaja.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kosha Mangsho with Luchi",
        description: "Bengali-style mutton curry (substitute paneer for a vegetarian version) served with luchi.",
        price: 55,
        imgURL: "https://img-global.cpcdn.com/recipes/14cef79885ad1075/680x482cq70/luchi-and-kosha-mangsho-chicken-recipe-main-photo.jpg",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Pulao with Vegetable Curry",
        description: "Fragrant rice with spices and vegetables.",
        price: 48,
        imgURL: "https://traditionallymodernfood.com/wp-content/uploads/2022/03/lunchbox-combo-veg-pulao-brinjal-curry-360x361.jpeg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Cholar Dal with Roti",
        description: "Creamy yellow lentils delicately spiced, ideal with simple roti.",
        price: 50,
        imgURL: "https://img-global.cpcdn.com/recipes/1e14dcf4ed2024a5/680x482cq70/%E0%A4%9A%E0%A4%A8-%E0%A4%A6%E0%A4%B2-%E0%A4%A4%E0%A4%A1%E0%A4%95-%E0%A4%94%E0%A4%B0-%E0%A4%B0%E0%A4%9F-chana-dal-tadka-aur-roti-recipe-in-hindi-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dhokar Dalna with Roti",
        description: "Spiced lentil cakes cooked in a flavorful tomato-based curry, served with roti.",
        price: 40,
        imgURL: "https://gayathriscookspot.com/wp-content/uploads/2014/01/DSC_00861.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Aloo Posto with Roti",
        description: "Savory poppy seed and potato curry with a hint of sweetness, enjoyed with roti.",
        price: 48,
        imgURL: "https://www.thebengalirecipe.com/images/Vegetarian_recipes/alu_posto/alu_posto_tsr_la.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Potoler Dolma with Roti",
        description: "Stuffed pointed gourd in a delicately spiced yogurt gravy, accompanied by roti.",
        price: 38,
        imgURL: "https://images.squarespace-cdn.com/content/v1/578753d7d482e9c3a909de40/1622001531034-28NXWBETHGGK7NSOCLCK/Potoler+Dolma+%26+the+Armenian+Origins+of+a+Beloved+Bengali+Recipe+%7C+Goya+Journal",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Chana Masala with Luchi",
        description: "Spicy chickpea curry paired with the Bengali favourite, fluffy luchi.",
        price: 55,
        imgURL: "https://pbs.twimg.com/media/E2fR84zVoAM9Dap?format=jpg&name=900x900",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Paneer Butter Masala with Roti",
        description: "Silky paneer in a rich tomato-butter sauce, served with roti.",
        price: 35,
        imgURL: "https://www.awesomecuisine.com/wp-content/uploads/2008/02/paneer_butter_masala_with_roti.jpg.webp",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Rosogolla and Sandesh",
        description: "Delight in these iconic Bengali sweets – spongy milk dumplings bathed in syrup (rosogolla) and sweet, delicate cottage cheese balls (sandesh).",
        price: 35,
        imgURL: "https://im.whatshot.in/img/2020/Sep/18019-d-1599558361.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: 6,
    name: "Neha Das",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/e46fa71bb022ce9caf6a900b5077adc8-removebg-preview.avif",
    foodType: "North Indian",
    quote: "A delightful journey through the taste of Bengal",
    rating: 3.8,
    feeds: 10,
    noOfOrders: 56,
    minPrice: 55,
    healthyPick: false,
    veg: true,
    spicy: true,
    dairyFree: false,
    dateOfJoining: "2024-02-22",
    subscriptionCost: 2900,
    dishes: [{
        name: "Bedmi Poori with Aloo Sabzi",
        description: "Deep-fried, lentil stuffed puris paired with a spicy potato curry.",
        price: 28,
        imgURL: "https://www.chefkunalkapur.com/wp-content/uploads/2022/03/poori-bhaji-1300x867.jpg?v=1646451148",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Chana Bhatura",
        description: "Spicy and flavorful chickpea curry accompanied by large, deep-fried bhatura bread.",
        price: 28,
        imgURL: "https://static.toiimg.com/thumb/53314156.cms?imgsize=1762111&width=800&height=800",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Dal Paratha",
        description: "Layered whole wheat flatbread stuffed with flavorful spiced lentils.",
        price: 28,
        imgURL: "https://shwetainthekitchen.com/wp-content/uploads/2021/05/Leftover-Dal-Paratha-500x500.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Stuffed Gobhi Paratha",
        description: "Flatbread stuffed with a spiced cauliflower filling. A satisfying and nutritious way to start the day.",
        price: 28,
        imgURL: "https://cdn3.foodviva.com/static-content/food-images/north-indian-recipes/gobhi-paratha-recipe/gobhi-paratha-recipe.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Idli Sambar",
        description: "Soft steamed rice cakes served with a slightly tangy lentil and vegetable stew. A South Indian delight popular across the north as well!",
        price: 28,
        imgURL: "https://www.vegrecipesofindia.com/wp-content/uploads/2014/05/idli-sambar-1.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Masala Omelet with Paratha",
        description: "Fluffy omelet spiced with onions, tomatoes, and green chilies, served with whole wheat paratha.",
        price: 28,
        imgURL: "https://i0.wp.com/theaspiringhomecook.com/wp-content/uploads/2018/06/MasalaOmelette.jpg?ssl=1",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Poha with Chai",
        description: "A light and wholesome dish made with flattened rice, onions, peanuts, and spices. Enjoy with a cup of hot chai.",
        price: 28,
        imgURL: "https://scontent.fdel29-1.fna.fbcdn.net/v/t1.18169-9/25396285_1911904435490340_4983530341863210496_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=-mSFsF3iPq0AX-fxtSE&_nc_ht=scontent.fdel29-1.fna&oh=00_AfAh9awQCKTB9hLB9GkUF9AoHRRSu3dBH6Jkf5Z7JYQP6g&oe=65F2748D",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Kadhi Pakora with Rice",
        description: "Flavorful yogurt-based spiced curry with gram flour dumplings (pakoras), served with steamed rice.",
        price: 48,
        imgURL: "https://static.toiimg.com/thumb/92950871.cms?imgsize=68608&width=800&height=800",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kofta Curry with Rice",
        description: "Vegetable dumplings (kofta) cooked in a rich, spiced gravy, served over basmati rice.",
        price: 60,
        imgURL: "https://img.hellofresh.com/f_auto,fl_lossy,h_640,q_auto,w_1200/hellofresh_s3/image/indian-beef-kofta-curry-5b1c651a.jpg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Aloo Gobi with Roti",
        description: "A classic stir-fry of potatoes and cauliflower in fragrant spices, served with roti.",
        price: 42,
        imgURL: "https://i0.wp.com/spicediary.com/wp-content/uploads/2018/02/dd_Fotor.png?resize=1024%2C731&ssl=1",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Rajma Chawal",
        description: "Ultimate comfort food – kidney beans in a savory curry, served with basmati rice.",
        price: 45,
        imgURL: "https://www.allrecipes.com/thmb/Me4czKw-BpIU5jNbeQc8KmvOPCU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/212366rajma-kidney-bean-curryAnonymous4x3-900a8f642100489ba050f9c9277e31e5.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Dum Aloo with Poori",
        description: "Baby potatoes cooked in a rich, yogurt-based sauce, served with deep-fried puri.",
        price: 38,
        imgURL: "https://img-global.cpcdn.com/recipes/7a0c84bd7f9f4b56/1200x630cq70/photo.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Chole Masala with Rice",
        description: "Savory, spicy chickpeas in a thick tomato-based gravy, served with aromatic basmati rice.",
        price: 55,
        imgURL: "https://nutritionstripped.com/wp-content/uploads/2019/08/Chana-Masala-vegan-vegetarian-healthy-dinner-recipe-nutritionstripped4-1346x701.jpg",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Vegetable Pulao",
        description: "Flavorful rice dish cooked with a medley of vegetables and spices.",
        price: 48,
        imgURL: "https://www.indianveggiedelight.com/wp-content/uploads/2019/07/veg-pulao-featured.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Shahi Paneer with Naan",
        description: "A rich and creamy cottage cheese dish in a tomato-cashew gravy, perfect with soft and fluffy naan.",
        price: 50,
        imgURL: "https://img-global.cpcdn.com/recipes/a28432f8f7485a0f/400x400cq70/photo.jpg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Vegetable Biryani",
        description: "A fragrant one-pot rice dish layered with assorted vegetables and spices.",
        price: 40,
        imgURL: "https://www.yummytummyaarthi.com/wp-content/uploads/2022/09/veg-biryani-1.jpeg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Palak Paneer with Naan",
        description: "One of the most popular North Indian dishes! Creamy spinach and paneer cheese combined, enjoyed with naan.",
        price: 48,
        imgURL: "https://img-global.cpcdn.com/recipes/eef661ef847ee7d8/680x482cq70/lasooni-palak-paneer-with-garlic-naan-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Mixed Vegetable Raita with Tandoori Roti",
        description: "Cooling yogurt dip with vegetables, accompanying perfectly baked tandoori roti.",
        price: 38,
        imgURL: "https://as1.ftcdn.net/v2/jpg/04/97/02/96/1000_F_497029657_5zLT4kZWfSOdZyir3h79HCbqmog1dLuS.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dal Makhani with Jeera Rice",
        description: "Creamy and flavorful black lentils slow-simmered in spices, enjoyed with cumin-flavored rice.",
        price: 55,
        imgURL: "https://img-global.cpcdn.com/recipes/acc289e1a1c5aa03/1200x630cq70/photo.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Paneer Tikka Masala with Naan",
        description: "Paneer marinated in spiced yogurt and grilled, then finished in a creamy tomato-based curry. Best enjoyed with naan.",
        price: 35,
        imgURL: "https://i1.wp.com/wanderingmatilda.com/wp-content/uploads/2015/12/img_20151201_144511-1.jpg?fit=1080%2C1080&ssl=1",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dal Makhani with Roti",
        description: "Creamy lentils with whole wheat roti.",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/9f6f1fc4506da013/1200x630cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: 7,
    name: "Sneha Mishra",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/d7fdc3057529d9137b44aca0254e01ff-removebg-preview.avif",
    foodType: "North Indian, Kashmiri",
    quote: "Savor the essence of authentic homemade delicacies",
    rating: 3.7,
    feeds: 5,
    noOfOrders: 64,
    minPrice: 89,
    healthyPick: false,
    veg: true,
    spicy: true,
    dairyFree: true,
    dateOfJoining: "2024-02-13",
    subscriptionCost: 2900,
    dishes: [{
        name: "Bedmi Poori with Aloo Sabzi",
        description: "Deep-fried, lentil stuffed puris paired with a spicy potato curry.",
        price: 28,
        imgURL: "https://www.chefkunalkapur.com/wp-content/uploads/2022/03/poori-bhaji-1300x867.jpg?v=1646451148",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Chana Bhatura",
        description: "Spicy and flavorful chickpea curry accompanied by large, deep-fried bhatura bread.",
        price: 28,
        imgURL: "https://static.toiimg.com/thumb/53314156.cms?imgsize=1762111&width=800&height=800",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Dal Paratha",
        description: "Layered whole wheat flatbread stuffed with flavorful spiced lentils.",
        price: 28,
        imgURL: "https://shwetainthekitchen.com/wp-content/uploads/2021/05/Leftover-Dal-Paratha-500x500.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Stuffed Gobhi Paratha",
        description: "Flatbread stuffed with a spiced cauliflower filling. A satisfying and nutritious way to start the day.",
        price: 28,
        imgURL: "https://cdn3.foodviva.com/static-content/food-images/north-indian-recipes/gobhi-paratha-recipe/gobhi-paratha-recipe.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Idli Sambar",
        description: "Soft steamed rice cakes served with a slightly tangy lentil and vegetable stew. A South Indian delight popular across the north as well!",
        price: 28,
        imgURL: "https://www.vegrecipesofindia.com/wp-content/uploads/2014/05/idli-sambar-1.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Masala Omelet with Paratha",
        description: "Fluffy omelet spiced with onions, tomatoes, and green chilies, served with whole wheat paratha.",
        price: 28,
        imgURL: "https://i0.wp.com/theaspiringhomecook.com/wp-content/uploads/2018/06/MasalaOmelette.jpg?ssl=1",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Poha with Chai",
        description: "A light and wholesome dish made with flattened rice, onions, peanuts, and spices. Enjoy with a cup of hot chai.",
        price: 28,
        imgURL: "https://scontent.fdel29-1.fna.fbcdn.net/v/t1.18169-9/25396285_1911904435490340_4983530341863210496_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=-mSFsF3iPq0AX-fxtSE&_nc_ht=scontent.fdel29-1.fna&oh=00_AfAh9awQCKTB9hLB9GkUF9AoHRRSu3dBH6Jkf5Z7JYQP6g&oe=65F2748D",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Kadhi Pakora with Rice",
        description: "Flavorful yogurt-based spiced curry with gram flour dumplings (pakoras), served with steamed rice.",
        price: 48,
        imgURL: "https://static.toiimg.com/thumb/92950871.cms?imgsize=68608&width=800&height=800",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kofta Curry with Rice",
        description: "Vegetable dumplings (kofta) cooked in a rich, spiced gravy, served over basmati rice.",
        price: 60,
        imgURL: "https://img.hellofresh.com/f_auto,fl_lossy,h_640,q_auto,w_1200/hellofresh_s3/image/indian-beef-kofta-curry-5b1c651a.jpg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Aloo Gobi with Roti",
        description: "A classic stir-fry of potatoes and cauliflower in fragrant spices, served with roti.",
        price: 42,
        imgURL: "https://i0.wp.com/spicediary.com/wp-content/uploads/2018/02/dd_Fotor.png?resize=1024%2C731&ssl=1",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Rajma Chawal",
        description: "Ultimate comfort food – kidney beans in a savory curry, served with basmati rice.",
        price: 45,
        imgURL: "https://www.allrecipes.com/thmb/Me4czKw-BpIU5jNbeQc8KmvOPCU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/212366rajma-kidney-bean-curryAnonymous4x3-900a8f642100489ba050f9c9277e31e5.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Dum Aloo with Poori",
        description: "Baby potatoes cooked in a rich, yogurt-based sauce, served with deep-fried puri.",
        price: 38,
        imgURL: "https://img-global.cpcdn.com/recipes/7a0c84bd7f9f4b56/1200x630cq70/photo.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Chole Masala with Rice",
        description: "Savory, spicy chickpeas in a thick tomato-based gravy, served with aromatic basmati rice.",
        price: 55,
        imgURL: "https://nutritionstripped.com/wp-content/uploads/2019/08/Chana-Masala-vegan-vegetarian-healthy-dinner-recipe-nutritionstripped4-1346x701.jpg",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Vegetable Pulao",
        description: "Flavorful rice dish cooked with a medley of vegetables and spices.",
        price: 48,
        imgURL: "https://www.indianveggiedelight.com/wp-content/uploads/2019/07/veg-pulao-featured.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Shahi Paneer with Naan",
        description: "A rich and creamy cottage cheese dish in a tomato-cashew gravy, perfect with soft and fluffy naan.",
        price: 50,
        imgURL: "https://img-global.cpcdn.com/recipes/a28432f8f7485a0f/400x400cq70/photo.jpg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Vegetable Biryani",
        description: "A fragrant one-pot rice dish layered with assorted vegetables and spices.",
        price: 40,
        imgURL: "https://www.yummytummyaarthi.com/wp-content/uploads/2022/09/veg-biryani-1.jpeg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Palak Paneer with Naan",
        description: "One of the most popular North Indian dishes! Creamy spinach and paneer cheese combined, enjoyed with naan.",
        price: 48,
        imgURL: "https://img-global.cpcdn.com/recipes/eef661ef847ee7d8/680x482cq70/lasooni-palak-paneer-with-garlic-naan-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Mixed Vegetable Raita with Tandoori Roti",
        description: "Cooling yogurt dip with vegetables, accompanying perfectly baked tandoori roti.",
        price: 38,
        imgURL: "https://as1.ftcdn.net/v2/jpg/04/97/02/96/1000_F_497029657_5zLT4kZWfSOdZyir3h79HCbqmog1dLuS.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dal Makhani with Jeera Rice",
        description: "Creamy and flavorful black lentils slow-simmered in spices, enjoyed with cumin-flavored rice.",
        price: 55,
        imgURL: "https://img-global.cpcdn.com/recipes/acc289e1a1c5aa03/1200x630cq70/photo.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Paneer Tikka Masala with Naan",
        description: "Paneer marinated in spiced yogurt and grilled, then finished in a creamy tomato-based curry. Best enjoyed with naan.",
        price: 35,
        imgURL: "https://i1.wp.com/wanderingmatilda.com/wp-content/uploads/2015/12/img_20151201_144511-1.jpg?fit=1080%2C1080&ssl=1",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dal Makhani with Roti",
        description: "Creamy lentils with whole wheat roti.",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/9f6f1fc4506da013/1200x630cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: "8",
    name: "Ananya Reddy",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/homemade-indian-vegetarian-food-allo-paratha-served-with-potato-curry-bowl-curd-traditional-cuisine_859990-3274-removebg-preview.avif",
    foodType: "North indian",
    quote: "Exploring the rich heritage of homemade flavors",
    rating: 4.4,
    feeds: 5,
    noOfOrders: 92,
    minPrice: 75,
    healthyPick: false,
    veg: true,
    spicy: false,
    dairyFree: true,
    dateOfJoining: "2023-05-23",
    subscriptionCost: 3400,
    dishes: [{
        name: "Luchi and Alur Dom",
        description: "Fluffy, deep-fried flatbreads (luchi) served with a simple and comforting potato curry (alur dom).",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/975266133b0afea9/400x400cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Radhaballavi and Cholar Dal",
        description: "Stuffed lentil flatbread (radhaballavi) accompanied by a mildly spiced cholar dal.",
        price: 28,
        imgURL: "https://babumoshai.org/wp-content/uploads/2022/05/rc-768x581.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Muri Ghonto",
        description: "A quick and comforting puffed rice dish flavored with fish, coconut, and vegetables.",
        price: 28,
        imgURL: "https://www.licious.in/blog/wp-content/uploads/2020/12/Muri-Ghonto-750x750.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Koraishutir Kochuri and Aloor Torkari",
        description: "Flaky flatbreads stuffed with green peas (koraishutir kochuri) served with a spicy potato curry (aloor torkari).",
        price: 28,
        imgURL: "https://4.bp.blogspot.com/-g15x29hgLKM/UTUVEcyegBI/AAAAAAAAJwc/VHgjm2XRIc4/s1600/644670_10151258531771736_1196157466_n%255B1%255D.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Doodh Poha",
        description: "Flattened rice softened in milk with sugar and nuts, a simple and delicious start to the day.",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/c576289703b55979/680x482cq70/poha-kheer-doodh-poha-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Vegetable Chop with Ghugni",
        description: "Spiced vegetable croquettes paired with dried yellow peas in a flavorful curry.",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/3945c0d52e48e15b/680x482cq70/aloo-chop-and-ghugni-recipe-main-photo.webp",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Mishti Doi",
        description: "Sweetened, set yogurt - a staple Bengali dessert for breakfast.",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/a554dbdc8d6a43fc/1200x630cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Shukto with Rice",
        description: "A medley of bitter and sweet vegetables cooked in a lightly spiced sauce, served with a mound of steamed rice.",
        price: 48,
        imgURL: "https://aahaaramonline.com/wp-content/uploads/2016/10/Shukto_Bengali_Recipe-1024x768.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Macher Jhol with Rice",
        description: "Bengali-style fish curry with potatoes in a light, flavorful broth, a classic with rice.",
        price: 60,
        imgURL: "https://1.bp.blogspot.com/-xIoxV6sZYko/VvwXWqhV3oI/AAAAAAAAG8s/sLKhfrxvo2w3GHMH-mjA-nad_gomgHA4Q/s640/mulo-diye-macher-jhol12.jpg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Chhanar Dalna with Rice",
        description: "Soft paneer cubes in a fragrant, spiced gravy, best enjoyed with rice.",
        price: 42,
        imgURL: "https://1.bp.blogspot.com/-jNw8Jj0UPrc/XxMG9HZm_7I/AAAAAAAAK-c/3xvcipmnSdsdRv82zKtGA5_5fnnJQT7yACLcBGAsYHQ/s1600/Chanar%2BDalna.JPG",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Moong Dal with Rice and Begun Bhaja",
        description: "Yellow lentil dal with fried eggplant slices, served with rice for a wholesome meal.",
        price: 45,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBciHPKr6lv8uT66sqlYrb6mkZzdYLhIPTM7G6Vg-ZOcl411xJxOPS5tqmmx3eFsCdNTc&usqp=CAU",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Maach Bhaja with Rice and Dal",
        description: "Pan-fried fish with simple lentil dal and steamed rice.",
        price: 38,
        imgURL: "https://rumkisgoldenspoon.com/wp-content/uploads/2022/07/Ilish-mach-bhaja.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kosha Mangsho with Luchi",
        description: "Bengali-style mutton curry (substitute paneer for a vegetarian version) served with luchi.",
        price: 55,
        imgURL: "https://img-global.cpcdn.com/recipes/14cef79885ad1075/680x482cq70/luchi-and-kosha-mangsho-chicken-recipe-main-photo.jpg",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Pulao with Vegetable Curry",
        description: "Fragrant rice with spices and vegetables.",
        price: 48,
        imgURL: "https://traditionallymodernfood.com/wp-content/uploads/2022/03/lunchbox-combo-veg-pulao-brinjal-curry-360x361.jpeg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Cholar Dal with Roti",
        description: "Creamy yellow lentils delicately spiced, ideal with simple roti.",
        price: 50,
        imgURL: "https://img-global.cpcdn.com/recipes/1e14dcf4ed2024a5/680x482cq70/%E0%A4%9A%E0%A4%A8-%E0%A4%A6%E0%A4%B2-%E0%A4%A4%E0%A4%A1%E0%A4%95-%E0%A4%94%E0%A4%B0-%E0%A4%B0%E0%A4%9F-chana-dal-tadka-aur-roti-recipe-in-hindi-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dhokar Dalna with Roti",
        description: "Spiced lentil cakes cooked in a flavorful tomato-based curry, served with roti.",
        price: 40,
        imgURL: "https://gayathriscookspot.com/wp-content/uploads/2014/01/DSC_00861.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Aloo Posto with Roti",
        description: "Savory poppy seed and potato curry with a hint of sweetness, enjoyed with roti.",
        price: 48,
        imgURL: "https://www.thebengalirecipe.com/images/Vegetarian_recipes/alu_posto/alu_posto_tsr_la.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Potoler Dolma with Roti",
        description: "Stuffed pointed gourd in a delicately spiced yogurt gravy, accompanied by roti.",
        price: 38,
        imgURL: "https://images.squarespace-cdn.com/content/v1/578753d7d482e9c3a909de40/1622001531034-28NXWBETHGGK7NSOCLCK/Potoler+Dolma+%26+the+Armenian+Origins+of+a+Beloved+Bengali+Recipe+%7C+Goya+Journal",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Chana Masala with Luchi",
        description: "Spicy chickpea curry paired with the Bengali favourite, fluffy luchi.",
        price: 55,
        imgURL: "https://pbs.twimg.com/media/E2fR84zVoAM9Dap?format=jpg&name=900x900",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Paneer Butter Masala with Roti",
        description: "Silky paneer in a rich tomato-butter sauce, served with roti.",
        price: 35,
        imgURL: "https://www.awesomecuisine.com/wp-content/uploads/2008/02/paneer_butter_masala_with_roti.jpg.webp",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Rosogolla and Sandesh",
        description: "Delight in these iconic Bengali sweets – spongy milk dumplings bathed in syrup (rosogolla) and sweet, delicate cottage cheese balls (sandesh).",
        price: 35,
        imgURL: "https://im.whatshot.in/img/2020/Sep/18019-d-1599558361.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: "9",
    name: "Nisha Choudhary",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/f7ed2310eb7229ac9e80d4c5341d82db-removebg-preview_cleanup.avif",
    foodType: "Rajasthani",
    quote: "Indulge in the authentic taste of Marwari cuisine",
    rating: 4.2,
    feeds: 10,
    noOfOrders: 76,
    minPrice: 90,
    healthyPick: false,
    veg: true,
    spicy: true,
    dairyFree: false,
    dateOfJoining: "2024-02-18",
    subscriptionCost: 3200,
    dishes: [{
        name: "Bajre ki Raab",
        description: "A warm and nourishing porridge made with pearl millet flour, buttermilk, and spices.",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/4e3d922e0cf49c53/680x482cq70/%E0%A4%AC%E0%A4%9C%E0%A4%B0-%E0%A4%95-%E0%A4%B0%E0%A4%AC-bajre-ka-raab-recipe-in-hindi-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Moong Dal Chilla",
        description: "Savory pancakes made with a spiced moong dal (yellow lentil) batter.",
        price: 28,
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2022/12/moong-dal-chilla-recipe-Piping-Pot-Curry.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Pyaz Kachori",
        description: "Deep-fried, flaky pastry filled with a spicy onion mixture.",
        price: 28,
        imgURL: "https://static.toiimg.com/thumb/59606392.cms?imgsize=319995&width=800&height=800",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Methi Bajra Poori",
        description: "Deep-fried bread made with pearl millet flour and fenugreek leaves.",
        price: 28,
        imgURL: "https://maayeka.com/wp-content/uploads/2013/02/methi-bajra-poori.jpg.webp",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Besan ka Cheela",
        description: "Savory pancakes made with gram flour (besan), yogurt, and spices.",
        price: 28,
        imgURL: "https://www.indianveggiedelight.com/wp-content/uploads/2022/12/besan-chilla-recipe-featured.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Mirchi Vada",
        description: "Large green chilies stuffed with a spiced potato filling and batter-fried.",
        price: 28,
        imgURL: "http://www.yummyfoodrecipes.in/resources/picture/org/Mirchi-Vada.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Mawa Kachori",
        description: "Pastry filled with sweetened khoya (reduced milk solids) and nuts.",
        price: 28,
        imgURL: "https://www.chefkunalkapur.com/wp-content/uploads/2021/10/3F3A0442-scaled-e1635216440410.jpg?v=1635215396",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Dal Baati Churma",
        description: "The quintessential Rajasthani dish! Hard wheat rolls (baati) baked traditionally in a pit, served with panchmel dal (mix of five lentils) and sweet churma (crumbled sweet bread).",
        price: 48,
        imgURL: "https://www.secondrecipe.com/wp-content/uploads/2020/11/dal-bati-churma.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Rajasthani Kadhi with Rice",
        description: "Flavorful yogurt-based spiced curry with gram flour dumplings (pakoras), served with steamed rice.",
        price: 60,
        imgURL: "https://thefoodscape.files.wordpress.com/2016/04/img_05751.jpg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Panchkuta Sabzi",
        description: "A unique dish blending five desert vegetables in a spiced preparation. Serve with roti or rice.",
        price: 42,
        imgURL: "https://images.slurrp.com/prodrich_article/ezvn9smbmke.webp?impolicy=slurrp-20210601&width=880&height=500",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Guvar Phali ki Sabzi with Rice",
        description: "Cluster beans in a tangy and flavorful gravy, enjoyed with rice.",
        price: 45,
        imgURL: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/sibyl-archanaskitchen.com/Gawar_Phali_Methi_Ki_Sabzi_Recipe_.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Papad Mangodi ki Sabzi with Rice",
        description: "A lentil and sun-dried papad (spicy wafers) curry with tangy dried mango, served with rice.",
        price: 38,
        imgURL: "https://i0.wp.com/www.blissofcooking.com/wp-content/uploads/2017/01/Papad-Mangodi-Ki-Sabzi-Feature.jpg?w=960&ssl=1",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Laal Maas with Rice",
        description: "A fiery mutton curry (substitute soy chunks or paneer for a vegetarian version), enjoyed with rice.",
        price: 55,
        imgURL: "https://bespoketraveler.files.wordpress.com/2015/10/laal-maas-view.jpg?w=695&h=463",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Ghevar",
        description: "A sweet disc-shaped delicacy made with flour, soaked in sugar syrup. (Enjoy as a special treat)",
        price: 48,
        imgURL: "https://www.cookforindia.com/wp-content/uploads/2016/08/ghevar.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Ker Sangri ki Sabzi with Bajra Roti",
        description: "Dried beans and berries cooked in a tangy and flavorful gravy. Enjoy with pearl millet roti.",
        price: 50,
        imgURL: "https://ishitarc1908.files.wordpress.com/2016/07/img_20160118_143009661_hdr.jpg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Gatte ki Sabzi with Roti",
        description: "Besan (gram flour) dumplings simmered in a rich, yogurt-based gravy, perfectly paired with roti.",
        price: 40,
        imgURL: "https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/sheetal-pandey20180426234034371.jpeg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Matar Paneer with Roti",
        description: "Green peas and paneer cubes cooked in a creamy tomato-based gravy, served with roti.",
        price: 48,
        imgURL: "https://www.sanjanafeasts.co.uk/wp-content/uploads/2018/05/Creamy-Restaurant-Style-Matar-Paneer-1-1024x683.jpg.webp",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Bhindi Masala with Roti",
        description: "Okra cooked in a traditional Rajasthani spice blend, paired with roti.",
        price: 38,
        imgURL: "https://static.toiimg.com/thumb/53227232.cms?imgsize=280291&width=800&height=800",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Aloo Methi Sabzi with Roti",
        description: "Simple yet delicious curry of potatoes and fenugreek leaves, paired with roti.",
        price: 55,
        imgURL: "https://img-global.cpcdn.com/recipes/2daf06e92de967c0/680x482cq70/%E0%A4%86%E0%A4%B2-%E0%A4%AE%E0%A4%A5-aloo-methi-ki-recipe-in-hindi-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dahi Bhindi with Roti",
        description: "Okra cooked in a creamy yogurt-based gravy, enjoyed with roti.",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/8a38bd481512ed73/680x482cq70/%E0%A4%A6%E0%A4%B9-%E0%A4%AD%E0%A4%A1-%E0%A4%94%E0%A4%B0-%E0%A4%AE%E0%A4%B2%E0%A4%9F%E0%A4%97%E0%A4%B0%E0%A4%A8-%E0%A4%B0%E0%A4%9F-dahi-bhindi-aur-multigrain-roti-recipe-in-hindi-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Chana Masala with Roti",
        description: "Hearty, spiced chickpea curry served with roti",
        price: 35,
        imgURL: "https://i0.wp.com/gomathirecipes.com/wp-content/uploads/2022/08/3298.jpg?fit=1200%2C800&ssl=1",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: 10,
    name: "Meera Joshi",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/Canon_190217_MG_2243is-removebg-preview-removebg-preview.avif",
    foodType: "Gujrati thali",
    quote: "Delight in the flavors of Gujarat with a variety of snacks",
    rating: 3.8,
    feeds: 5,
    noOfOrders: 322,
    minPrice: 74,
    healthyPick: true,
    veg: true,
    spicy: true,
    dairyFree: true,
    dateOfJoining: "2024-03-1",
    subscriptionCost: 3000,
    dishes: [{
        name: "Mithe Chawal (Sweet Rice)",
        description: "Flavored rice cooked with saffron, nuts, and a touch of sweetness.",
        price: 28,
        imgURL: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Hina_Gujral/Meethe_Chawal_Recipe_Zarda_Pulao_400.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Bajra Aloo Paratha",
        description: "Flatbread stuffed with pearl millet and spiced potato filling.",
        price: 28,
        imgURL: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Farrukh_Aziz_Ansari/Bajra_Aloo_Paratha.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Besan Masala Roti",
        description: "Flatbread made with gram flour and spices, served with yogurt.",
        price: 28,
        imgURL: "https://images.slurrp.com/prod/articles/l3i3l25dhw7.webp",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Dalia Khichdi",
        description: "Savory porridge made with cracked wheat (dalia), vegetables, and spices.",
        price: 28,
        imgURL: "https://www.whiskaffair.com/wp-content/uploads/2021/01/Daliya-Khichdi-2-6.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Methi Paratha",
        description: "Flatbread with a flavorful fenugreek leaf filling.",
        price: 28,
        imgURL: "https://www.whiskaffair.com/wp-content/uploads/2020/04/Methi-Paratha-3-500x500.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Poha",
        description: "Light and wholesome dish made with flattened rice, onions, peanuts, and spices.",
        price: 28,
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2020/12/Poha-Recipe-indori-Piping-Pot-Curry-1024x1024.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Churma",
        description: "Traditional sweet dish made with crumbled roti, ghee, and jaggery or sugar.",
        price: 28,
        imgURL: "https://vegecravings.com/wp-content/uploads/2016/03/churma-step-by-step-recipe-1024x878.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Gajar Methi Sabzi with Roti and Raita",
        description: "Carrots and fenugreek leaves cooked in a spiced tomato-onion base, served with whole wheat roti and curd or raita.",
        price: 48,
        imgURL: "https://mycookingjourney.com/wp-content/uploads/2014/04/Haryana-Besan-Masala-roti-with-Gajar-methi-subzi-%2828%29-1024x768.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kadhi Pakora with Rice and Raita",
        description: "Yogurt-based curry with gram flour dumplings, served with rice and a side of curd or raita.",
        price: 60,
        imgURL: "https://img-global.cpcdn.com/recipes/5ade4167c6629cda/680x482cq70/kadhi-pakoda-with-boiled-rice-recipe-main-photo.jpg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Mixed Dal with Rice and Raita",
        description: "A hearty mix of lentils cooked with spices, served with rice and curd or raita.",
        price: 42,
        imgURL: "https://img-global.cpcdn.com/recipes/7fa1c0d0929ff581/680x482cq70/lunch-platter-sabji-dal-raita-rice-papad-roti-salad-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kachri ki Sabzi with Roti and Raita",
        description: "Dried, wild cucumber cooked in a tangy spice mix, served with roti and curd or raita.",
        price: 45,
        imgURL: "https://img-global.cpcdn.com/recipes/112261f964f504af/1200x630cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Singri ki Sabzi with Bajra Roti and Raita",
        description: "Dried beans and berries in a tangy gravy, enjoyed with pearl millet roti (bajra roti) and a side of raita.",
        price: 38,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7w63XJ1xYyV1_gM-VFMtjPoHFQgXtUO9Q8g&usqp=CAU",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Gobhi Matar with Rice and Raita",
        description: "Cauliflower and peas in a spiced tomato gravy, with basmati rice and curd or raita.",
        price: 55,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIqAGo1bsrk3AYgFjC9S3Sj3WRZOQXYUUedA&usqp=CAU",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kadhi Pakora with Rice and Raita",
        description: "Yogurt-based curry with gram flour dumplings, served with rice and a side of curd or raita.",
        price: 48,
        imgURL: "https://img-global.cpcdn.com/recipes/5ade4167c6629cda/680x482cq70/kadhi-pakoda-with-boiled-rice-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Hara Chana Masala with Rice",
        description: "Fresh green chickpeas cooked in a savory, spicy gravy, served with basmati rice.",
        price: 50,
        imgURL: "https://www.usfoods.com/content/usfoods-dce/en/great-food/recipes/chana-masala/_jcr_content/recipe-header/image.img.jpg/1645652021787.jpg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Bhindi Masala with Roti",
        description: "Okra (bhindi) cooked in a flavorful onion-tomato base and spices, served with whole wheat roti.",
        price: 40,
        imgURL: "https://static.toiimg.com/thumb/53227232.cms?imgsize=280291&width=800&height=800",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Bathua Raita with Roti",
        description: "Yogurt-based dip with fresh bathua greens (Chenopodium), served with roti.",
        price: 48,
        imgURL: "https://www.temptingtreat.com/wp-content/uploads/2020/04/F-2.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Gatte ki Sabzi with Rice",
        description: "Gram flour dumplings in a yogurt-based, spiced gravy, served with basmati rice.",
        price: 38,
        imgURL: "https://media-cdn.tripadvisor.com/media/photo-s/06/52/68/c8/rice-with-gatte-ki-sabzi.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Palak Paneer with Roti",
        description: "Creamy spinach with paneer, served with whole wheat roti",
        price: 55,
        imgURL: "https://preview.redd.it/d8ydi58hukp81.jpg?width=640&crop=smart&auto=webp&s=cc036761df387805244f1ecd204f387a7966af49",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Baingan Bharta with Roti",
        description: "Roasted and mashed eggplant, with whole-wheat roti.",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/9e865d6ad3a18e55/680x482cq70/%E0%A4%AE%E0%A4%B8%E0%A4%B8-%E0%A4%B0%E0%A4%9F-%E0%A4%B5%E0%A4%A6-%E0%A4%AC%E0%A4%97%E0%A4%A8-%E0%A4%AD%E0%A4%B0%E0%A4%A4-missi-roti-with-baingan-bharta-recipe-in-hindi-%E0%A4%B0%E0%A4%B8%E0%A4%AA-%E0%A4%AE%E0%A4%96%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A4%B5%E0%A4%B0.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Besan Gatta Curry with Roti",
        description: "Gram flour dumplings in a tangy yogurt gravy, with whole wheat roti.",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/e14d040e02006f88/680x482cq70/besan-gatta-curry-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: 11,
    name: "Radha Iyer",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/Saffron-rice-kheer-indian-rice-pudding-keer-diwali-removebg-preview-removebg-preview.avif",
    foodType: "Idli, Dosa, Upma, Vada",
    quote: "Experience a fusion of traditional Indian flavors with a modern twist",
    rating: 4.5,
    feeds: 5,
    noOfOrders: 102,
    minPrice: 87,
    healthyPick: true,
    veg: false,
    spicy: true,
    dairyFree: false,
    dateOfJoining: "2022-11-16",
    subscriptionCost: 3100,
    dishes: [{
        name: "Aloo Paratha",
        description: "Flatbread stuffed with a spiced potato mixture, served with yogurt and butter.",
        price: 28,
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg/640px-Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Poha",
        description: "A light and wholesome dish made with flattened rice, onions, peanuts, and spices.",
        price: 28,
        imgURL: "https://www.indianveggiedelight.com/wp-content/uploads/2022/07/poha-recipe-featured.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Amritsari Kulcha",
        description: "Flatbread stuffed with a spiced potato filling, served with chole (spicy chickpeas).",
        price: 28,
        imgURL: "https://static.toiimg.com/thumb/62376759.cms?width=1200&height=900",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Gobhi Paratha",
        description: "Flatbread stuffed with spiced cauliflower.",
        price: 28,
        imgURL: "https://cdn.cdnparenting.com/articles/2020/04/24161922/Gobi-Cauliflower-Paratha-Recipe.webp",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Stuffed Besan Cheela",
        description: "Savory pancakes with a spiced paneer filling.",
        price: 28,
        imgURL: "https://www.sinamontales.com/dotcord/uploads/2016/06/paneer-stuffed-besan-chilla-stuffed-savory-lentil-crepes.1024x1024-4.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Lassi and Masala Omelet",
        description: "Sweetened yogurt drink paired with a spiced omelet.",
        price: 28,
        imgURL: "https://www.yummytummyaarthi.com/wp-content/uploads/2016/10/1-1.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Puri Halwa",
        description: "Deep-fried puffy bread served with a sweet semolina pudding.",
        price: 28,
        imgURL: "https://soyummyrecipes.com/wp-content/uploads/2020/12/Halwa-Puri-2.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Chana Masala with Basmati Rice",
        description: "Spicy chickpea curry served with aromatic basmati rice. Include a side of curd or raita.",
        price: 48,
        imgURL: "https://www.connoisseurusveg.com/wp-content/uploads/2023/04/chana-masala-sq.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Rajma Chawal with Curd/Raita",
        description: "Kidney beans in a savory curry, served with basmati rice and a side of curd or raita.",
        price: 60,
        imgURL: "https://d3gy1em549lxx2.cloudfront.net/3a6f9ed4-c34f-4e6b-a865-ea478283bbb5.jpeg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Kadhi Pakora with Rice",
        description: "Yogurt-based curry with gram flour dumplings, served with rice. Include a side of raita.",
        price: 42,
        imgURL: "https://img-global.cpcdn.com/recipes/8d4b14d120042a09/1200x630cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Sarson Ka Saag with Makki Di Roti and Raita",
        description: "Mustard greens curry with cornflour flatbread and a side of curd or raita.",
        price: 45,
        imgURL: "https://img-global.cpcdn.com/recipes/7ff540a98240391c/400x400cq70/photo.jpg",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Bharwan Baingan with Rice",
        description: "Stuffed eggplants in a tangy gravy served with rice. Include a side of curd or raita.",
        price: 38,
        imgURL: "https://i0.wp.com/thefoodsamaritan.com/wp-content/uploads/2016/05/IMG_1048.jpg?resize=1024%2C683",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Baingan Bharta with Roti and Raita",
        description: "Roasted and mashed eggplant served with whole-wheat roti and a side of curd or raita.",
        price: 55,
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2022/11/Baingan-Bharta-Recipe-Piping-Pot-Curry.--500x500.jpg",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Mixed Vegetable Curry with Rice and Raita",
        description: "A medley of vegetables served with rice and a side of curd or raita.",
        price: 48,
        imgURL: "https://meatfreemondays.com/wp-content/uploads/2020/01/Vegetable-Curry-with-Raita-RS-N.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Saag Paneer with Roti",
        description: "Creamy spinach with paneer, served with whole wheat roti.",
        price: 50,
        imgURL: "https://images.fittrapi.com/tr:w-1024,pr-true,q-60/5a395a00-cff8-469f-a4a1-eb8588d19c4a.jpeg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Butter Chicken (Murgh Makhani) with Naan",
        description: "Rich chicken in a buttery tomato sauce, perfect with fluffy naan.",
        price: 40,
        imgURL: "https://www.missionfoods.com/wp-content/uploads/2022/06/easy-butter-chicken-naan-1024x683.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dal Makhani with Roti ",
        description: "Creamy lentils with whole wheat roti.",
        price: 48,
        imgURL: "https://www.kannammacooks.com/wp-content/uploads/dal-makhani-recipe-cream-1-3.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Tandoori Chicken with Naan",
        description: "Yogurt and spice marinated chicken served with naan.",
        price: 38,
        imgURL: "https://10play.com.au/ip/s3/2021/04/26/d1025c69d859472304e1746d2ea99019-1051597.jpg?image-profile=image_max&io=landscape",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Punjabi Chole Bhature",
        description: "Spicy chickpea curry served with deep-fried, fluffy bread.",
        price: 55,
        imgURL: "https://media.vogue.in/wp-content/uploads/2020/08/chole-bhature-recipe.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Amritsari Machli with Rice",
        description: "Crispy, batter-fried fish with basmati rice.",
        price: 35,
        imgURL: "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/amritsari-fried-fish-scaled-e1621348565229.jpeg?v=1618226070",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Shahi Paneer with Naan",
        description: "Rich and creamy paneer with naan.",
        price: 35,
        imgURL: "https://thisthatmore.blog/wp-content/uploads/2019/06/IMG_4921-1024x683.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  },
  {
    id: 12,
    name: "Anjali Sharma",
    imgURL: "https://mopin-assets.s3.ap-south-1.amazonaws.com/food+imagery/fd608126a5c63c254610dd0f9f76222c-removebg-preview.avif",
    foodType: "North indian",
    quote: "Homemade goodness that satisfies your cravings",
    rating: 4.2,
    feeds: 10,
    noOfOrders: 122,
    minPrice: 79,
    healthyPick: false,
    dateOfJoining: "2024-02-22",
    veg: false,
    spicy: false,
    dairyFree: false,
    subscriptionCost: 3000,
    dishes: [{
        name: "Idli sambar and coconut chutney",
        description: "A South Indian trio that brings together fluffy rice cakes, flavorful lentil stew, and creamy coconut chutney. A symphony of tastes in every bite!",
        price: 28,
        imgURL: "https://img-global.cpcdn.com/recipes/3ad5b61d118fd588/1360x964cq70/idli-sambar-and-coconut-chutney-recipe-main-photo.webp",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Upma with chutney and sambar",
        description: "A South Indian delight that harmonizes the wholesome goodness of semolina, zesty chutney, and flavorful sambar. A taste of comfort and tradition in every mouthful!",
        price: 28,
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/8/86/A_photo_of_Upma.jpg",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Aloo Paratha and Tomato Chutney",
        description: "Crispy, golden parathas embrace a spiced potato filling, while the tangy tomato chutney adds a delightful twist. A delectable combination that's sure to satisfy your cravings.",
        price: 28,
        imgURL: "https://i0.wp.com/aartimadan.com/wp-content/uploads/2023/03/vrat-ka-aloo-paratha.jpg?w=800&ssl=1",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Puri with Aloo Sabji",
        description: "Crispy, fluffy, and satisfying, paired with a flavorful potato curry. A symphony of textures and flavors to tantalize your taste buds.",
        price: 28,
        imgURL: "https://www.chefkunalkapur.com/wp-content/uploads/2021/05/Aloo-Puri-Bhaji.jpg?v=1620385178",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Poha",
        description: "Fluffy flattened rice sautéed with spices, herbs, and a hint of lemon, offering a delightful and quick Breakfast option with a burst of flavors.",
        price: 28,
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2020/12/Poha-Recipe-indori-Piping-Pot-Curry-1024x1024.jpg",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Dosa",
        description: " South India's crispy marvel, a thin, golden delight that pairs perfectly with spiced potatoes. A tasty crunch in every bite.",
        price: 28,
        imgURL: "https://homechefscooking.files.wordpress.com/2017/12/filmora.png",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Moong Dal Chilla",
        description: "Wholesome and savory, these lentil pancakes are a healthy, protein-packed delight, perfect for a satisfying Breakfast or snack.",
        price: 28,
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2022/12/moong-dal-chilla-recipe-Piping-Pot-Curry-768x768.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Breakfast"
        }]
      },
      {
        name: "Paneer Butter Masala with Chapattis",
        description: "Paneer cubes simmered in a rich tomato-based gravy with a hint of cream and aromatic spices. Served with soft chapattis. A North Indian favorite that's indulgent and satisfying.",
        price: 48,
        imgURL: "https://www.spiceindiaonline.com/wp-content/uploads/2021/02/Easy-Paneer-Butter-Masala-3-500x375.jpg",
        isVeg: true,
        availability: [{
          day: "Monday",
          meal: "Lunch"
        }]
      },
      {
        name: "Mutton Biryani",
        description: "Fragrant basmati rice cooked with tender mutton pieces and aromatic spices. A delicious and aromatic biryani. Served with raita and salad.",
        price: 60,
        imgURL: "https://paattiskitchen.com/wp-content/uploads/2023/03/kmc_20230323_230743-1024x576.jpg",
        isVeg: false,
        availability: [{
          day: "Tuesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Palak Paneer with Roti",
        description: "Cubes of paneer in a creamy spinach gravy, seasoned with Indian spices. Served with soft rotis. A wholesome and vegetarian delight that's rich in flavor and nutrients.",
        price: 42,
        imgURL: "https://cdn.squats.in/thumbnail/5a395a00-cff8-469f-a4a1-eb8588d19c4a.jpeg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Lunch"
        }]
      },
      {
        name: "Vegetable Pulao with Raita",
        description: "Fragrant basmati rice cooked with a medley of vegetables and aromatic spices. Served with cooling raita. A vegetarian pulao that's both flavorful and satisfying.",
        price: 45,
        imgURL: "https://www.vidhyashomecooking.com/wp-content/uploads/2020/09/VegPulao.webp",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Lunch"
        }]
      },
      {
        name: "Aloo Gobi with Parathas",
        description: "A comforting blend of potatoes and cauliflower, sautéed with spices and herbs. Served with fresh, hot parathas. A homely and satisfying dish that's full of flavor.",
        price: 38,
        imgURL: "https://lh3.googleusercontent.com/g4sB_w3iSRD29-b3ZJTWh0Up3yYFyInpxTAWAlbH6TN5dIwL_vv3R_V_-X4Op2Tpmwi2jtwzrEeFjlhHTV8oLcyMsH2gut8I3dxX_X0=w512-rw",
        isVeg: true,
        availability: [{
          day: "Friday",
          meal: "Lunch"
        }]
      },
      {
        name: "Tandoori Chicken with Rice",
        description: "Chicken marinated in yogurt and spices, cooked to perfection in a tandoor. Served with fragrant basmati rice, naan, and a side of mint chutney. A smoky and flavorful dish that's a delight for meat lovers.",
        price: 55,
        imgURL: "https://img.taste.com.au/rqiE1KpD/w720-h480-cfill-q80/taste/2016/11/tandoori-chicken-with-basmati-rice-104271-1.jpeg",
        isVeg: false,
        availability: [{
          day: "Saturday",
          meal: "Lunch"
        }]
      },
      {
        name: "Veg Biryani with Raita",
        description: "Fragrant basmati rice cooked with a medley of vegetables and aromatic spices. Served with cooling raita. A vegetarian biryani that's a burst of flavors and textures.",
        price: 48,
        imgURL: "https://img-global.cpcdn.com/recipes/74bc670d9918e7b8/680x482cq70/veg-hyderabadi-biryani-with-boondi-raita-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Lunch"
        }]
      },
      {
        name: "Butter Chicken with Naan",
        description: "Tender chicken pieces simmered in a rich tomato-based gravy with a hint of cream and aromatic spices. Served with soft naan. A North Indian classic that's indulgent and savory.",
        price: 50,
        imgURL: "https://www.missionfoods.com/wp-content/uploads/2022/06/easy-butter-chicken-naan-1024x683.jpg",
        isVeg: false,
        availability: [{
          day: "Monday",
          meal: "Dinner"
        }]
      },
      {
        name: "Mixed Vegetable Curry with Roti",
        description: "A flavorful medley of mixed vegetables in a spiced curry. Served with soft rotis. A wholesome vegetarian meal that's perfect for Lunch.",
        price: 40,
        imgURL: "https://www.cookingandme.com/wp-content/uploads/2012/12/8234784286_ee408b27e6_z1.webp",
        isVeg: true,
        availability: [{
          day: "Tuesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Veg Fried Rice with Manchurian",
        description: "Fragrant fried rice, accompanied by vegetable Manchurian. A delightful fusion of Indian and Chinese flavors.",
        price: 48,
        imgURL: "https://www.nehascookbook.com/wp-content/uploads/2022/10/Fried-rice-lobi-manchurian-WS-768x432.jpg",
        isVeg: true,
        availability: [{
          day: "Wednesday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dal Tadka with Jeera Rice",
        description: "Yellow lentils cooked with spices and tempered with aromatic ghee. Served with cumin-flavored rice. A comforting and satisfying vegetarian meal.",
        price: 38,
        imgURL: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F8c0ef296153b3b754f5770623631eff2.cdn.bubble.io%2Ff1597941414091x788717463110555500%2FJeera%2520Rice%2520and%2520Dal%2520Fry.jpg?w=1024&h=&auto=compress&dpr=1.25&fit=max",
        isVeg: true,
        availability: [{
          day: "Thursday",
          meal: "Dinner"
        }]
      },
      {
        name: "Fish Curry with Steamed Rice",
        description: "Fish cooked in a spicy and tangy curry, served with steamed rice. A coastal delight for seafood enthusiasts.",
        price: 55,
        imgURL: "https://paattiskitchen.com/wp-content/uploads/2023/01/kmc_20230110_142103-1-1200x675.jpg",
        isVeg: false,
        availability: [{
          day: "Friday",
          meal: "Dinner"
        }]
      },
      {
        name: "Malai Kofta with Chapattis",
        description: "Deep-fried paneer and vegetable dumplings served in a creamy and rich cashew-based gravy, flavored with aromatic spices along with chapattis",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/8d6f90118e354b90/680x482cq70/malai-kofta-and-tandoori-roti-recipe-main-photo.jpg",
        isVeg: true,
        availability: [{
          day: "Saturday",
          meal: "Dinner"
        }]
      },
      {
        name: "Dal Makhni with naan",
        description: "A creamy and flavorful lentil curry made with a combination of black lentils (urad dal) and kidney beans (rajma), simmered in a rich tomato-based gravy with aromatic spices.",
        price: 35,
        imgURL: "https://img-global.cpcdn.com/recipes/549969a2accee087/1360x964cq70/dal-makhni-with-garlic-naan-recipe-main-photo.webp",
        isVeg: true,
        availability: [{
          day: "Sunday",
          meal: "Dinner"
        }]
      },
    ]
  }
];

export default homecooks;
