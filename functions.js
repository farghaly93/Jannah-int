module.exports.justifyIndexFile = () => {

    let title = null;
    let mobileTitle = null;
    let image = null;

    const path = "./";

    fs.readFile(path + "/deploy_data.json", "utf8", (err, data) => {
      if(err) return console.log(err)
      const headData = JSON.parse(data);
      title = headData.title.toString();
      mobileTitle = headData.mobileTitle.toString();
      image = headData.image.toString();
      const indexFile = fs.readFileSync(path + "/server/dist/index.html", "utf8");
      // if(err) return console.log(err);
      let str = indexFile.toString();
      let title1ToChange = str.split("<title>")[1].split("</title>")[0].toString();
      let title2ToChange = str.split('"og:title" content="')[1].split('"')[0].toString();
      let imageToChange = str.split('"og:image" content="')[1].split('"')[0].toString();
      let icon = str.split('link rel="icon" href="')[1].split('"')[0].toString();
      // let mobileTitleToChange = str.split("name=apple-mobile-web-app-title content=")[1].split(">")[0].toString();
      // let icon16 = str.split('<link rel=icon type=image/png sizes=16x16 href=')[1].split('>')[0].toString();
      // let appleTouchIcon = str.split('<link rel=apple-touch-icon href=')[1].split('>')[0].toString();
      // let maskIcon = str.split('<link rel=mask-icon href=')[1].split('>')[0].toString();
      // let msapplicationTileImage = str.split('<meta name=msapplication-TileImage content=')[1].split('>')[0].toString();
      
      console.log(title1ToChange)
      console.log(title2ToChange)
      console.log(title)

      let modified = str.replace(title1ToChange, title);
      modified = modified.replace(title2ToChange, title);
      modified = modified.replace(imageToChange, image);
      modified = modified.replace(icon, image);
      // modified = modified.replace(mobileTitleToChange, mobileTitle);
      // modified = modified.replace(icon16, image);
      // modified = modified.replace(appleTouchIcon, image);
      // modified = modified.replace(maskIcon, image);
      // modified = modified.replace(msapplicationTileImage, image);

      fs.writeFile(path + "/server/dist/index.html", modified, "utf8", (err, data) => {
        if(err) console.log(err);
        else {
          console.log("DONE...");
        }
      })
    })
}