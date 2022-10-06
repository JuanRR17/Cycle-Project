const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      data: null,
      message: null,
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
            "https://3001-juanrr17-cycleproject-u7g3sswfuqh.ws-eu70.gitpod.io/api/signup",
            opts
          );
          if (resp.status !== 200) {
            // console.log("There has been some error", resp.status);
            // console.log("resp", resp);
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
            "https://3001-juanrr17-cycleproject-u7g3sswfuqh.ws-eu70.gitpod.io/api/token",
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
          //return true;
        } catch (error) {
          console.error("There has been an error logging in:", error);
        }
      },

      getData: async () => {
        // 2. Fetch to retrieve user data

        const store = getStore();
        console.log("token in getData", store.token);
        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            "https://3001-juanrr17-cycleproject-u7g3sswfuqh.ws-eu70.gitpod.io/api/user",
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
            "https://3001-juanrr17-cycleproject-u7g3sswfuqh.ws-eu70.gitpod.io/api/user/edit",
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
    },
  };
};

export default getState;
