import { Sequelize } from "sequelize";

// Konfigurasi koneksi ke basis data MySQL
const sequelize = new Sequelize("store", "root", "", {
  host: "localhost",
  dialect: "mysql",
  // Lain-lain opsi koneksi jika diperlukan
});

// Coba koneksi ke basis data
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelize;
