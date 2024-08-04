import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Alert = ({ status, pesan }) => {
  useEffect(() => {
    if (status) {
      Swal.fire({
        title: "Sukses",
        text: pesan,
        icon: "success",
      });
    } else if (status === false) {
      Swal.fire({
        title: "Gagal",
        text: pesan,
        icon: "error",
      });
    }
  }, [status]);

  return <div></div>;
};

export default Alert;
