const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      data: null,
      message: null,
      types: ["Select a type", "Organic", "Plastic", "Textile", "Metallic"],
      units: ["Select an unit", "kg", "g", "m", "m2", "m3", "L", "unit/s"],
      product: null,
      update: false,
      all_products: null,
      favourites: [],
      user: null,
      basket: [],
    },
    actions: {
      // Use getActions to call a function within a function

      //LOGOUT
      logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        console.log("Login out");
        setStore({
          token: null,
          data: null,
          message: null,
          product: null,
          update: false,
          favourites: [],
          basket: [],
        });
      },
      //SYNCYNG TOKEN IN SESSION
      syncTokenFromSessionStore: () => {
        const store = getStore();
        const token = sessionStorage.getItem("token");
        console.log(
          "Application just loaded, synching the session storage token"
        );
        if (token && token != "" && token != undefined)
          if (store.token == undefined) setStore({ token: token });
      },
      //SIGN UP
      signup: async (username, email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            opts
          );
          if (resp.status !== 200) {
            console.log("There has been some error", resp.status);
            const data = await resp.json();
            setStore({ message: data.msg });
            return false;
          }
          const data = await resp.json();
          setStore({ message: null });
          console.log("User created data response", data);
          return true;
        } catch (error) {
          console.error("There has been an error signing up:", resp.status);
        }
      },
      //LOGIN
      login: async (email, password) => {
        // 1. Fetch to generate token
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/token",
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error generating token");
            const data = await resp.json();
            setStore({ message: data.msg });
            return false;
          }

          const data = await resp.json();
          console.log("This came from the backend", data);

          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token, message: null });
        } catch (error) {
          console.error("There has been an error logging in:", error);
        }
      },
      //GET CURRENT USER DATA
      getCurrentUserData: async () => {
        // 2. Fetch to retrieve user data

        const store = getStore();
        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/user",
            data_opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error retrieving data");
            return false;
          }

          const user_data = await resp.json();
          console.log("This is the user data", user_data);
          setStore({
            data: user_data,
            message: null,
            favourites: user_data.favourites,
            basket: user_data.basket,
          });
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },
      //GET AN USER DATA
      getUserData: async (id) => {
        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/user/" + id,
            data_opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error retrieving data");
            return false;
          }

          const user_data = await resp.json();
          console.log("This is the user data", user_data);
          setStore({ user: user_data, message: null });
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },
      //EDIT USER PROFILE
      editprofile: async (
        id,
        username,
        email,
        company,
        phone,
        location,
        password
      ) => {
        const store = getStore();

        const opts = {
          method: "PUT",
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            company: company,
            phone: phone,
            location: location,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/user/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error updating the data");
            const msg = await resp.json();
            setStore({ message: msg.msg });
            return false;
          }

          const user_data = await resp.json();
          console.log("This is the user data", user_data);
          setStore({ data: user_data, message: null });
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },
      // CLEAR MESSAGES
      clearmessage: () => {
        setStore({ message: null });
      },
      //DELETE USER PROFILE
      delete_profile: async (id) => {
        const store = getStore();

        const opts = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/user/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error deleting the user");
            const msg = await resp.json();
            setStore({ message: msg.msg });
            return false;
          }

          const user_data = await resp.json();
          console.log("This is the user data", user_data);
          console.log("User deleted");
          setStore({ token: null, data: null, message: null });
          return true;
        } catch (error) {
          console.error("There has been an error deleting the user:", error);
        }
      },
      // CREATE NEW PRODUCT
      new_product: async (
        user_id,
        name,
        stock,
        type,
        price,
        unit,
        location,
        description
      ) => {
        const store = getStore();

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            user_id: user_id,
            name: name,
            stock: Number(stock),
            type: store.types[type],
            price: Number(price),
            unit: store.units[unit],
            location: location,
            description: description,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/product",
            opts
          );
          if (resp.status !== 200) {
            console.log(
              "There has been some error creating the product",
              resp.status
            );
            const data = await resp.json();
            setStore({ message: data.msg, product: null });
            return false;
          }
          const data = await resp.json();
          setStore({ message: null });
          console.log("Product created data:", data);
          setStore({ update: true });
          return true;
        } catch (error) {
          console.error(
            "There has been an error creating the product:",
            resp.status
          );
        }
      },
      //SET SINGLE PRODUCT
      setSingleProduct: (product) => {
        setStore({ product: product });
      },
      //GET PRODUCT DATA
      getProductData: async (id) => {
        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/product/" + id,
            data_opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error retrieving data");
            return false;
          }

          const product_data = await resp.json();
          console.log("This is the product data", product_data);
          setStore({ product: product_data });
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },
      //GET ALL PRODUCTS
      getAllProducts: async () => {
        const url = process.env.BACKEND_URL + "/api/products/";
        console.log("testing", url);
        try {
          const resp = await fetch(url);
          console.log("testing after");
          if (resp.status !== 200) {
            console.log(
              "There has been some error retrieving all products data"
            );
            return false;
          }

          const all_products = await resp.json();
          console.log("These are all products data", all_products);
          setStore({ all_products: all_products });
          return true;
        } catch (error) {
          console.error(
            "There has been an error retrieving all products data:",
            error
          );
        }
      },
      //DELETE PRODUCT
      delete_product: async (id) => {
        const store = getStore();

        const opts = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/product/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error deleting the product");
            const msg = await resp.json();
            setStore({ message: msg.msg });
            return false;
          }

          const user_data = await resp.json();
          console.log("This is the product data", user_data);
          console.log("Product deleted");
          setStore({ message: null, update: true });
          return true;
        } catch (error) {
          console.error("There has been an error deleting the product:", error);
        }
      },
      //SET NEW
      toggle_update: () => {
        const store = getStore();
        setStore({ update: !store.update });
      },
      //EDIT PRODUCT
      edit_product: async (
        id,
        user_id,
        name,
        stock,
        type,
        price,
        unit,
        location,
        description
      ) => {
        const store = getStore();

        const opts = {
          method: "PUT",
          body: JSON.stringify({
            user_id: user_id,
            name: name,
            stock: stock,
            type: type,
            price: price,
            unit: unit,
            location: location,
            description: description,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/product/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error updating the product");
            const msg = await resp.json();
            setStore({ message: msg.msg, product: null });
            return false;
          }

          const product_data = await resp.json();
          console.log("This is the product data", product_data);
          return true;
        } catch (error) {
          console.error(
            "There has been an error retrieving product data:",
            error
          );
        }
      },
      //ADD FAVOURITE
      add_favourite: async (user_id, product_id) => {
        const store = getStore();

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            user_id: user_id,
            product_id: product_id,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/favourite",
            opts
          );
          if (resp.status !== 200) {
            console.log(
              "There has been some error adding the favourite",
              resp.status
            );
            const data = await resp.json();
            setStore({ message: data.msg });
            return false;
          }
          const favourites = await resp.json();
          const newFavourites = [...store.favourites, favourites];
          setStore({ favourites: newFavourites });
          console.log("new favourites:", store.favourites);
          return true;
        } catch (error) {
          console.error(
            "There has been an error adding the favourite:",
            resp.status
          );
        }
      },
      //DELETE FAVOURITE
      delete_favourite: async (id) => {
        const store = getStore();

        const opts = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/favourite/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error deleting the favourite");
            return false;
          }

          const favourite = await resp.json();
          const newFavourites = store.favourites.filter((fav) => {
            return fav.id !== favourite.id;
          });
          console.log("Favourite deleted");
          setStore({ favourites: newFavourites });
          console.log("These are the remaining favourites", store.favourites);

          return true;
        } catch (error) {
          console.error(
            "There has been an error deleting the favourite:",
            error
          );
        }
      },
      //ADD BASKET ITEM
      add_to_basket: async (user_id, product_id) => {
        const store = getStore();

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            user_id: user_id,
            product_id: product_id,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/basket",
            opts
          );
          if (resp.status !== 200) {
            console.log(
              "There has been some error adding the basket item",
              resp.status
            );
            const data = await resp.json();
            setStore({ message: data.msg });
            return false;
          }
          const basket_item = await resp.json();
          const newBasket = [...store.basket, basket_item];
          setStore({ basket: newBasket });
          console.log("new basket:", store.basket);
          return true;
        } catch (error) {
          console.error(
            "There has been an error adding the basket item:",
            resp.status
          );
        }
      },
      //DELETE BASKET ITEM
      delete_from_basket: async (id) => {
        const store = getStore();

        const opts = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/basket/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error deleting the basket item");
            return false;
          }

          const basket_item = await resp.json();
          const newBasket = store.basket.filter((bi) => {
            return bi.id !== basket_item.id;
          });
          console.log("Basket item deleted");
          setStore({ basket: newBasket });
          console.log("This is the remaining basket", store.basket);

          return true;
        } catch (error) {
          console.error(
            "There has been an error deleting the basket item:",
            error
          );
        }
      },
    },
  };
};

export default getState;
