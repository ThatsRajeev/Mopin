const homecooks = [
  {
    name: "Anjali Sharma",
    imgURL: "https://drive.google.com/uc?id=18HdS78hUBEsyE-ALtmAEcPEjJGqCQ-kv",
    foodType: "South indian, Punjabi",
    quote: "Homemade goodness that satisfies your cravings",
    rating: "4.2",
    noOfOrders: "122",
    minPrice: "79",
    healthyPick: false,
    dateOfJoining: "2023-12-22",
    dishes: [
      {
        name: "Idli sambar and coconut chutney",
        description: "A South Indian trio that brings together fluffy rice cakes, flavorful lentil stew, and creamy coconut chutney. A symphony of tastes in every bite!",
        price: "28",
        imgURL: "https://img-global.cpcdn.com/recipes/3ad5b61d118fd588/1360x964cq70/idli-sambar-and-coconut-chutney-recipe-main-photo.webp",
        isVeg: true,
        availability: [
          {
            day: "Monday",
            meal: "Breakfast"
          }
        ]
      },
      {
        name: "Upma with chutney and sambar",
        description: "A South Indian delight that harmonizes the wholesome goodness of semolina, zesty chutney, and flavorful sambar. A taste of comfort and tradition in every mouthful!",
        price: "28",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/8/86/A_photo_of_Upma.jpg",
        isVeg: true,
        availability: [
          {
            day: "Tuesday",
            meal: "Breakfast"
          }
        ]
      },
      {
        name: "Aloo Paratha and Tomato Chutney",
        description: "Crispy, golden parathas embrace a spiced potato filling, while the tangy tomato chutney adds a delightful twist. A delectable combination that's sure to satisfy your cravings.",
        price: "28",
        imgURL: "https://i0.wp.com/aartimadan.com/wp-content/uploads/2023/03/vrat-ka-aloo-paratha.jpg?w=800&ssl=1",
        isVeg: true,
        availability: [
          {
            day: "Wednesday",
            meal: "Breakfast"
          }
        ]
      },
      {
        name: "Puri with Aloo Sabji",
        description: "Crispy, fluffy, and satisfying, paired with a flavorful potato curry. A symphony of textures and flavors to tantalize your taste buds.",
        price: "28",
        imgURL: "https://www.chefkunalkapur.com/wp-content/uploads/2021/05/Aloo-Puri-Bhaji.jpg?v=1620385178",
        isVeg: true,
        availability: [
          {
            day: "Thursday",
            meal: "Breakfast"
          }
        ]
      },
      {
        name: "Poha",
        description: "Fluffy flattened rice sautéed with spices, herbs, and a hint of lemon, offering a delightful and quick Breakfast option with a burst of flavors.",
        price: "28",
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2020/12/Poha-Recipe-indori-Piping-Pot-Curry-1024x1024.jpg",
        isVeg: true,
        availability: [
          {
            day: "Friday",
            meal: "Breakfast"
          }
        ]
      },
      {
        name: "Dosa",
        description: " South India's crispy marvel, a thin, golden delight that pairs perfectly with spiced potatoes. A tasty crunch in every bite.",
        price: "28",
        imgURL: "https://homechefscooking.files.wordpress.com/2017/12/filmora.png",
        isVeg: true,
        availability: [
          {
            day: "Saturday",
            meal: "Breakfast"
          }
        ]
      },
      {
        name: "Moong Dal Chilla",
        description: "Wholesome and savory, these lentil pancakes are a healthy, protein-packed delight, perfect for a satisfying Breakfast or snack.",
        price: "28",
        imgURL: "https://pipingpotcurry.com/wp-content/uploads/2022/12/moong-dal-chilla-recipe-Piping-Pot-Curry-768x768.jpg",
        isVeg: true,
        availability: [
          {
            day: "Sunday",
            meal: "Breakfast"
          }
        ]
      },
      {
        name: "Paneer Butter Masala with Chapattis",
        description: "Paneer cubes simmered in a rich tomato-based gravy with a hint of cream and aromatic spices. Served with soft chapattis. A North Indian favorite that's indulgent and satisfying.",
        price: "48",
        imgURL: "https://www.spiceindiaonline.com/wp-content/uploads/2021/02/Easy-Paneer-Butter-Masala-3-500x375.jpg",
        isVeg: true,
        availability: [
          {
            day: "Monday",
            meal: "Lunch"
          }
        ]
      },
      {
        name: "Mutton Biryani",
        description: "Fragrant basmati rice cooked with tender mutton pieces and aromatic spices. A delicious and aromatic biryani. Served with raita and salad.",
        price: "60",
        imgURL: "https://paattiskitchen.com/wp-content/uploads/2023/03/kmc_20230323_230743-1024x576.jpg",
        isVeg: false,
        availability: [
          {
            day: "Tuesday",
            meal: "Lunch"
          }
        ]
      },
      {
        name: "Palak Paneer with Roti",
        description: "Cubes of paneer in a creamy spinach gravy, seasoned with Indian spices. Served with soft rotis. A wholesome and vegetarian delight that's rich in flavor and nutrients.",
        price: "42",
        imgURL: "https://cdn.squats.in/thumbnail/5a395a00-cff8-469f-a4a1-eb8588d19c4a.jpeg",
        isVeg: true,
        availability: [
          {
            day: "Wednesday",
            meal: "Lunch"
          }
        ]
      },
      {
        name: "Vegetable Pulao with Raita",
        description: "Fragrant basmati rice cooked with a medley of vegetables and aromatic spices. Served with cooling raita. A vegetarian pulao that's both flavorful and satisfying.",
        price: "45",
        imgURL: "https://www.vidhyashomecooking.com/wp-content/uploads/2020/09/VegPulao.webp",
        isVeg: true,
        availability: [
          {
            day: "Thursday",
            meal: "Lunch"
          }
        ]
      },
      {
        name: "Aloo Gobi with Parathas",
        description: "A comforting blend of potatoes and cauliflower, sautéed with spices and herbs. Served with fresh, hot parathas. A homely and satisfying dish that's full of flavor.",
        price: "38",
        imgURL: "https://lh3.googleusercontent.com/g4sB_w3iSRD29-b3ZJTWh0Up3yYFyInpxTAWAlbH6TN5dIwL_vv3R_V_-X4Op2Tpmwi2jtwzrEeFjlhHTV8oLcyMsH2gut8I3dxX_X0=w512-rw",
        isVeg: true,
        availability: [
          {
            day: "Friday",
            meal: "Lunch"
          }
        ]
      },
      {
        name: "Tandoori Chicken with Rice",
        description: "Chicken marinated in yogurt and spices, cooked to perfection in a tandoor. Served with fragrant basmati rice, naan, and a side of mint chutney. A smoky and flavorful dish that's a delight for meat lovers.",
        price: "55",
        imgURL: "http://lh5.ggpht.com/_dfV_Eqz0Ypw/TW7wtalNsYI/AAAAAAAABoA/lp7vridOTnY/Tandoori-Chicken3.jpg?imgmax=800",
        isVeg: false,
        availability: [
          {
            day: "Saturday",
            meal: "Lunch"
          }
        ]
      },
      {
        name: "Veg Biryani with Raita",
        description: "Fragrant basmati rice cooked with a medley of vegetables and aromatic spices. Served with cooling raita. A vegetarian biryani that's a burst of flavors and textures.",
        price: "48",
        imgURL: "https://fifolive.com/wp-content/uploads/2021/05/veg-biryani.jpg",
        isVeg: true,
        availability: [
          {
            day: "Sunday",
            meal: "Lunch"
          }
        ]
      },
      {
        name: "Butter Chicken with Naan",
        description: "Tender chicken pieces simmered in a rich tomato-based gravy with a hint of cream and aromatic spices. Served with soft naan. A North Indian classic that's indulgent and savory.",
        price: "50",
        imgURL: "https://www.missionfoods.com/wp-content/uploads/2022/06/easy-butter-chicken-naan-1024x683.jpg",
        isVeg: false,
        availability: [
          {
            day: "Monday",
            meal: "Dinner"
          }
        ]
      },
      {
        name: "Mixed Vegetable Curry with Roti",
        description: "A flavorful medley of mixed vegetables in a spiced curry. Served with soft rotis. A wholesome vegetarian meal that's perfect for Lunch.",
        price: "40",
        imgURL: "https://www.cookingandme.com/wp-content/uploads/2012/12/8234784286_ee408b27e6_z1.webp",
        isVeg: true,
        availability: [
          {
            day: "Tuesday",
            meal: "Dinner"
          }
        ]
      },
      {
        name: "Veg Fried Rice with Manchurian",
        description: "Fragrant fried rice, accompanied by vegetable Manchurian. A delightful fusion of Indian and Chinese flavors.",
        price: "48",
        imgURL: "https://www.nehascookbook.com/wp-content/uploads/2022/10/Fried-rice-lobi-manchurian-WS-768x432.jpg",
        isVeg: true,
        availability: [
          {
            day: "Wednesday",
            meal: "Dinner"
          }
        ]
      },
      {
        name: "Dal Tadka with Jeera Rice",
        description: "Yellow lentils cooked with spices and tempered with aromatic ghee. Served with cumin-flavored rice. A comforting and satisfying vegetarian meal.",
        price: "38",
        imgURL: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F8c0ef296153b3b754f5770623631eff2.cdn.bubble.io%2Ff1597941414091x788717463110555500%2FJeera%2520Rice%2520and%2520Dal%2520Fry.jpg?w=1024&h=&auto=compress&dpr=1.25&fit=max",
        isVeg: true,
        availability: [
          {
            day: "Thursday",
            meal: "Dinner"
          }
        ]
      },
      {
        name: "Fish Curry with Steamed Rice",
        description: "Fish cooked in a spicy and tangy curry, served with steamed rice. A coastal delight for seafood enthusiasts.",
        price: "55",
        imgURL: "https://paattiskitchen.com/wp-content/uploads/2023/01/kmc_20230110_142103-1-1200x675.jpg",
        isVeg: false,
        availability: [
          {
            day: "Friday",
            meal: "Dinner"
          }
        ]
      },
      {
        name: "Malai Kofta with Chapattis",
        description: "Deep-fried paneer and vegetable dumplings served in a creamy and rich cashew-based gravy, flavored with aromatic spices along with chapattis",
        price: "35",
        imgURL: "https://scontent.fdel29-1.fna.fbcdn.net/v/t1.6435-9/79269978_741132956432467_2703428168080824912_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=9267fe&_nc_ohc=WAdv7JKPVfoAX8QFY9C&_nc_ht=scontent.fdel29-1.fna&oh=00_AfAOc5rc7NWycCQtuhpjj5T5BPSnPpucKTzr8gE7ddLhVg&oe=654DEDE3",
        isVeg: true,
        availability: [
          {
            day: "Saturday",
            meal: "Dinner"
          }
        ]
      },
      {
        name: "Dal Makhni with naan",
        description: "A creamy and flavorful lentil curry made with a combination of black lentils (urad dal) and kidney beans (rajma), simmered in a rich tomato-based gravy with aromatic spices.",
        price: "35",
        imgURL: "https://img-global.cpcdn.com/recipes/549969a2accee087/1360x964cq70/dal-makhni-with-garlic-naan-recipe-main-photo.webp",
        isVeg: true,
        availability: [
          {
            day: "Sunday",
            meal: "Dinner"
          }
        ]
      },
    ]
  },
  {
    name: "Aisha Khan",
    imgURL: "https://drive.google.com/uc?id=111Xml6eQqj69sbAvPegspY-ak3YJ36Bc",
    foodType: "North indian, Punjabi",
    quote: "Crafting flavors with love and passion",
    rating: "4.1",
    noOfOrders: "68",
    minPrice: "65",
    healthyPick: true,
    dateOfJoining: "2022-08-25"
  },
  {
    name: "Nandini Verma",
    imgURL: "https://drive.google.com/uc?id=1LC9FEMiyzE7rYJSXC_uX3pbVjRf5TmSW",
    foodType: "North indian, Gujrati",
    quote: "Indulge in the essence of homemade delicacies",
    rating: "4.2",
    noOfOrders: "45",
    minPrice: "99",
    healthyPick: true,
    dateOfJoining: "2022-12-12"
  },
  {
    name: "Lakshmi Patel",
    imgURL: "https://drive.google.com/uc?id=1N1Wt104e7_L7ahM6GDiH4x4lH3E5p0-T",
    foodType: "Biryani, Rajasthani",
    quote: "Authentic homemade flavors delivered with love",
    rating: "4.5",
    noOfOrders: "153",
    minPrice: "88",
    healthyPick: false,
    dateOfJoining: "2023-11-25",
  },
  {
    name: "Sakshi Iyer",
    imgURL: "https://drive.google.com/uc?id=1fbSErkSm1418iHntp_7kYLFSHItnO8GP",
    foodType: "Italian, Chinese",
    quote: "Unleashing flavors that ignite your taste buds",
    rating: "4.2",
    noOfOrders: "48",
    minPrice: "75",
    healthyPick: true,
    dateOfJoining: "2022-07-15"
  },
  {
    name: "Neha Das",
    imgURL: "https://drive.google.com/uc?id=1gCOCXh5EvepWdKOWZCCZp-jKHE8z6KlS",
    foodType: "Bengali thali",
    quote: "A delightful journey through the taste of Bengal",
    rating: "3.8",
    noOfOrders: "56",
    minPrice: "55",
    healthyPick: false,
    dateOfJoining: "2023-11-22"
  },
  {
    name: "Sneha Mishra",
    imgURL: "https://drive.google.com/uc?id=1sGYWkrVBx4k7fVl9MMlINfR4l5afhpK4",
    foodType: "North Indian, Kashmiri",
    quote: "Savor the essence of authentic homemade delicacies",
    rating: "3.7",
    noOfOrders: "64",
    minPrice: "89",
    healthyPick: false,
    dateOfJoining: "2024-02-13"
  },
  {
    name: "Ananya Reddy",
    imgURL: "https://drive.google.com/uc?id=1_R4qnhEax83mL_6hD2EEkMooDwahzJ0j",
    foodType: "North indian",
    quote: "Exploring the rich heritage of homemade flavors",
    rating: "4.4",
    noOfOrders: "92",
    minPrice: "75",
    healthyPick: false,
    dateOfJoining: "2023-05-23"
  },
  {
    name: "Nisha Choudhary",
    imgURL: "https://drive.google.com/uc?id=1IF4Z7M1omGvqnwJ7--eJ1N7JP8VtNzOY",
    foodType: "North indian, Rajasthani",
    quote: "Indulge in the authentic taste of Marwari cuisine",
    rating: "4.2",
    noOfOrders: "76",
    minPrice: "90",
    healthyPick: false,
    dateOfJoining: "2024-02-18"
  },
  {
    name: "Meera Joshi",
    imgURL: "https://drive.google.com/uc?id=1fF8XjRHuLVgD37W9oKqmntTYdZwZLs8G",
    foodType: "Gujrati thali",
    quote: "Delight in the flavors of Gujarat with a variety of snacks",
    rating: "3.8",
    noOfOrders: "322",
    minPrice: "74",
    healthyPick: true,
    dateOfJoining: "2023-12-1"
  },
  {
    name: "Radha Iyer",
    imgURL: "https://drive.google.com/uc?id=1371VAyHl8UkFwZ3DVe5eFtTBdPazk82u",
    foodType: "Idli, Dosa, Upma, Vada",
    quote: "Experience a fusion of traditional Indian flavors with a modern twist",
    rating: "4.5",
    noOfOrders: "102",
    minPrice: "87",
    healthyPick: true,
    dateOfJoining: "2022-11-16"
  },
  {
    name: "Jyoti Yadav",
    imgURL: "https://drive.google.com/uc?id=1QnJnmJQxoH-rmMxytVokFkOx3-q-i4PJ",
    foodType: "Rajasthani thali",
    quote: "Savor the rich and aromatic flavors of North Indian and Mughlai cuisine",
    rating: "4.5",
    noOfOrders: "68",
    minPrice: "59",
    healthyPick: false,
    dateOfJoining: "2022-09-25"
  },
  {
    name: "Kiara sodi",
    imgURL: "https://drive.google.com/uc?id=1lDIsh9tUsKKkbC7Tn3mk9kPQuwlzZTIa",
    foodType: "Punjabi thali",
    quote: "An amalgamation of South Indian and Indo-Chinese delicacies",
    rating: "4.2",
    noOfOrders: "72",
    minPrice: "84",
    healthyPick: false,
    dateOfJoining: "2024-01-18"
  },
  {
    name: "Bharti Verma",
    imgURL: "https://drive.google.com/uc?id=1MyGQgV8Y0iEAnoBPeui4tfIPq8pH3uIn",
    foodType: "North indian",
    quote: "Savor the authentic taste of South India with our flavorful Kerala dishes",
    rating: "4.0",
    noOfOrders: "32",
    minPrice: "99",
    healthyPick: true,
    dateOfJoining: "2022-03-18"
  },
  {
    name: "Mithali",
    imgURL: "https://drive.google.com/uc?id=15eVsJxh0yr3l9vUouCngISlRo-kp13ZL",
    foodType: "Punjabi thali",
    quote: "Taste the authentic flavors of Bengal with our delectable fish curries and more",
    rating: "4.3",
    noOfOrders: "72",
    minPrice: "94",
    healthyPick: true,
    dateOfJoining: "2022-07-18"
  },
  {
    name: "Vedika Rama",
    imgURL: "https://drive.google.com/uc?id=1WNX26ZjRMvU9_GS7KyvOKdGxedjgNGgQ",
    foodType: "South indian",
    quote: "Experience the opulence of Mughlai and Awadhi delicacies fit for the royals",
    rating: "4.4",
    noOfOrders: "54",
    minPrice: "64",
    healthyPick: false,
    dateOfJoining: "2022-03-25"
  },
  {
    name: "Aishwarya Sharma",
    imgURL: "https://drive.google.com/uc?id=1g2bEk6PuphI31Y1J6g-4Q5l6gOV2wkzi",
    foodType: "North indian",
    quote: "Indulge in the rich and aromatic flavors of Kashmir with our authentic Wazwan dishes",
    rating: "4.4",
    noOfOrders: "102",
    minPrice: "79",
    healthyPick: true,
    dateOfJoining: "2022-12-18"
  },
  {
    name: "Ishika Banerjee",
    imgURL: "https://drive.google.com/uc?id=1Gwzqsmwu3rSO8BWwAX7xQ3usTstBHk7L",
    foodType: "Bengali dishes",
    quote: "Savor the traditional flavors of Gujarat and Rajasthan in every bite",
    rating: "4.6",
    noOfOrders: "132",
    minPrice: "69",
    healthyPick: false,
    dateOfJoining: "2023-01-25"
  },
  {
    name: "Tania Singh",
    imgURL: "https://drive.google.com/uc?id=1LA8O7-kpn5T4M1GPDbCaiLvXOjffg1PR",
    foodType: "Biryani",
    quote: "Experience the authentic flavors of Maharashtra and the coastal delights of Konkan",
    rating: "4.0",
    noOfOrders: "107",
    minPrice: "59",
    healthyPick: true,
    dateOfJoining: "2022-09-25"
  },
  {
    name: "Rashmika Dubey",
    imgURL: "https://drive.google.com/uc?id=1kLopUlCrMDVc4wOoJi3y_cJ_mPtPYmZ_",
    foodType: "Continental, Chinese",
    quote: "Tantalize your taste buds with the perfect blend of Indian and Chinese flavors",
    rating: "3.9",
    noOfOrders: "128",
    minPrice: "89",
    healthyPick: false,
    dateOfJoining: "2024-01-24"
  }
];

export default homecooks;
