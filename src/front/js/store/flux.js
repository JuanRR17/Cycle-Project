const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      data: null,
      message: null,
      types: ["Select a type", "Organic", "Plastic", "Textile", "Metalic"],
      units: ["kg", "g", "m", "m2", "m3", "L", "unit/s"],
    },
    actions: {
      // Use getActions to call a function within a function
      logout: () => {
        sessionStorage.removeItem("token");
        console.log("Login out");
        setStore({ token: null, data: null, message: null });
      },

      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        console.log(
          "Application just loaded, synching the session storage token"
        );
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

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

      getUserData: async () => {
        // 2. Fetch to retrieve user data

        const store = getStore();
        console.log("token in getUserData", store.token);
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
          setStore({ data: user_data, message: null });
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },

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

      clearmessage: () => {
        setStore({ message: null });
      },

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
          sessionStorage.removeItem("token");
          console.log("User deleted");
          setStore({ token: null, data: null, message: null });
          return true;
        } catch (error) {
          console.error("There has been an error deleting the user:", error);
        }
      },

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
            setStore({ message: data.msg });
            return false;
          }
          const data = await resp.json();
          setStore({ message: null });
          console.log("Product created data:", data);
          return true;
        } catch (error) {
          console.error(
            "There has been an error creating the product:",
            resp.status
          );
        }
      },
    },
  };
};

export default getState;
