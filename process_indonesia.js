const fs = require("fs"); // Import modul fs

const createProvinsi = async () => {
  try {
    const indonesia = await fs.readFileSync("./indonesia.json");
    const data_indonesia = JSON.parse(indonesia);
    if (data_indonesia) {
      const result = Object.keys(data_indonesia).map((x) => ({ name: x, ID: data_indonesia[x].ID }));
      // check and create folder
      if (!fs.existsSync("provinsi")) fs.mkdirSync("provinsi");
      // save file
      fs.writeFileSync("provinsi/indonesia.json", JSON.stringify(result));
    }
  } catch (error) {
    console.log(error);
  }
};

const createKabupaten = async () => {
  try {
    const indonesia = await fs.readFileSync("./indonesia.json");
    const provinsi = await fs.readFileSync("./provinsi/indonesia.json");
    const data_indonesia = JSON.parse(indonesia);
    const data_provinsi = JSON.parse(provinsi);
    if (data_indonesia && data_provinsi) {
      data_provinsi.map((x) => {
        const kabupaten = data_indonesia[x.name]["Kabupaten/Kota"];
        if (kabupaten) {
          const result = Object.keys(kabupaten).map((y) => ({ name: y, ID: kabupaten[y].ID, Type: kabupaten[y].Type }));
          // check and create folder
          if (!fs.existsSync("kabupaten")) fs.mkdirSync("kabupaten");
          // save file
          fs.writeFileSync(`kabupaten/${x.name}.json`, JSON.stringify(result));
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createKecamatan = async () => {
  try {
    const indonesia = await fs.readFileSync("./indonesia.json");
    const provinsi = await fs.readFileSync("./provinsi/indonesia.json");
    const data_indonesia = JSON.parse(indonesia);
    const data_provinsi = JSON.parse(provinsi);
    if (data_indonesia && data_provinsi) {
      data_provinsi.map(async (x) => {
        const kabupaten = await fs.readFileSync(`./kabupaten/${x.name}.json`);
        const data_kabupaten = JSON.parse(kabupaten);
        if (data_kabupaten) {
          data_kabupaten.map((y) => {
            const kecamatan = data_indonesia[x.name]["Kabupaten/Kota"][y.name]["Kecamatan"];
            const result = Object.keys(kecamatan).map((z) => ({ name: z, ID: kecamatan[z].ID }));
            // check and create folder
            if (!fs.existsSync("kecamatan")) fs.mkdirSync("kecamatan");
            // save file
            fs.writeFileSync(`kecamatan/${y.name}.json`, JSON.stringify(result));
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createDesa = async () => {
  try {
    const indonesia = await fs.readFileSync("./indonesia.json");
    const provinsi = await fs.readFileSync("./provinsi/indonesia.json");
    const data_indonesia = JSON.parse(indonesia);
    const data_provinsi = JSON.parse(provinsi);
    if (data_indonesia && data_provinsi) {
      data_provinsi.map(async (x) => {
        const kabupaten = await fs.readFileSync(`./kabupaten/${x.name}.json`);
        const data_kabupaten = JSON.parse(kabupaten);
        if (data_kabupaten) {
          data_kabupaten.map(async (y) => {
            const kecamatan = await fs.readFileSync(`./kecamatan/${y.name}.json`);
            const data_kecamatan = JSON.parse(kecamatan);
            if (data_kecamatan) {
              data_kecamatan.map((z) => {
                const desa = data_indonesia[x.name]["Kabupaten/Kota"][y.name]["Kecamatan"][z.name]["Kelurahan/Desa"];
                const result = Object.keys(desa).map((aa) => ({ name: aa, ID: desa[aa].ID, "Kode Pos": desa[aa]["Kode Pos"] }));
                // check and create folder
                if (!fs.existsSync("desa")) fs.mkdirSync("desa");
                // save file
                fs.writeFileSync(`desa/${z.name}.json`, JSON.stringify(result));
              });
            }
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//===== fungsi create provinsi
// createProvinsi();
//===== fungsi create kabupaten
// createKabupaten();
//===== fungsi create kecamatan
// createKecamatan();
//===== fungsi create desa
// createDesa();
