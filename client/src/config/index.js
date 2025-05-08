import { Airplay, BabyIcon, CloudLightning, Heater, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from "lucide-react";
import { SiPuma,  SiNike, SiAdidas, SiZara } from "react-icons/si";

export const registerFromControls = [
    {
       name : 'username',
       label : 'User Name', 
       placeholder : 'Enter your username', 
       componentType : 'input', 
       type : 'text', 
    },
    {
       name : 'email',
       label : 'Email', 
       placeholder : 'Enter your Email', 
       componentType : 'input', 
       type : 'email', 
    },
    {
       name : 'password',
       label : 'Password', 
       placeholder : 'Enter your Password', 
       componentType : 'input', 
       type : 'password', 
    },
]

export const loginFormControls = [
   {
     name: "email",
     label: "Email",
     placeholder: "Enter your email",
     componentType: "input",
     type: "email",
   },
   {
     name: "password",
     label: "Password",
     placeholder: "Enter your password",
     componentType: "input",
     type: "password",
   },
 ];

 export const addProductFormElements = [
   {
     label: "Title",
     name: "title",
     componentType: "input",
     type: "text",
     placeholder: "Enter product title",
   },
   {
     label: "Description",
     name: "description",
     componentType: "textarea",
     placeholder: "Enter product description",
   },
   {
     label: "Category",
     name: "category",
     componentType: "select",
     options: [
       { id: "men", label: "Men" },
       { id: "women", label: "Women" },
       { id: "kids", label: "Kids" },
       { id: "accessories", label: "Accessories" },
       { id: "footwear", label: "Footwear" },
     ],
   },
   {
     label: "Brand",
     name: "brand",
     componentType: "select",
     options: [
       { id: "nike", label: "Nike" },
       { id: "adidas", label: "Adidas" },
       { id: "puma", label: "Puma" },
       { id: "levi", label: "Levi's" },
       { id: "zara", label: "Zara" },
       { id: "h&m", label: "H&M" },
     ],
   },
   {
     label: "Price",
     name: "price",
     componentType: "input",
     type: "number",
     placeholder: "Enter product price",
   },
   {
     label: "Sale Price",
     name: "salePrice",
     componentType: "input",
     type: "number",
     placeholder: "Enter sale price (optional)",
   },
   {
     label: "Total Stock",
     name: "totalStock",
     componentType: "input",
     type: "number",
     placeholder: "Enter total stock",
   },
 ];
 
 export const ShHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
 ]

 export const filterOptions = {
  Category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  Brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const categoryOptions = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

export const brandsWithIcon = [
  { id: "nike", label: "Nike", icon:  SiNike },
  { id: "adidas", label: "Adidas", icon: SiAdidas },
  { id: "puma", label: "Puma", icon: SiPuma },
  { id: "levi", label: "Levi's", icon: Shirt },
  { id: "zara", label: "Zara", icon: SiZara },
  { id: "h&m", label: "H&M", icon: ShoppingBasket },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "number",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phoneno",
    componentType: "input",
    type: "number",
    placeholder: "Enter your phone number",
  },
  {
    label: "Landmark",
    name: "landmark",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];