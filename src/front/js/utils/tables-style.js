export const customStyles = {
  table: {
    style: {
      boxShadow: "inset 0 0 15px 10px rgba(20, 48, 9, 0.8)",
      marginBottom: "10px",
      borderRadius: "20px",
      overflow: "hidden",
    },
  },
  header: {
    style: {
      color: "transparent",
      backgroundColor: "unset",
    },
  },
  head: {
    style: {
      color: "green",
      fontSize: "15px",
      fontWeight: 600,
    },
  },
  headRow: {
    style: {
      backgroundColor: "#eead35",
      boxShadow: "inset 0 10px 20px 0px rgba(20, 48, 9, 0.8)",
    },
  },
  rows: {
    style: {
      backgroundColor: "#ffffffd3",
    },
    selectedHighlightStyle: {
      "&:nth-of-type(n)": {
        color: "black",
        backgroundColor: "#ffc459",
        borderBottomColor: "orange",
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: "#eead35ab",
    },
    stripedStyle: {
      color: "white",
      backgroundColor: "#7b9251bf",
    },
  },
  cells: {
    style: {
      backgroundColor: "unset",
    },
  },
  contextMenu: {
    style: {
      backgroundColor: "#8db77b",
      borderRadius: "10px",
    },
  },
  pagination: {
    style: {
      color: "white",
      fontSize: "13px",
      minHeight: "56px",
      backgroundColor: "unset",
      borderTopStyle: "solid",
      borderTopWidth: "1px",
    },
    pageButtonsStyle: {
      color: "white",
      backgroundColor: "white",
      padding: "1px",
      margin: "2px",
    },
  },
  noData: {
    style: {
      color: "#ffffffd3",
      backgroundColor: "rgba(20, 48, 9)",
      fontSize: "20px",
      fontWeight: "600",
    },
  },
};
