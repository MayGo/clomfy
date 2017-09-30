![Clomfy](https://github.com/MayGo/clomfy/raw/master/screenshots/clomfy-logo.png "Clomfy")
-------

Cloud Foundy manager.

!!! Work in progress !!!

- Windows [Download ver 0.0.1](https://github.com/MayGo/clomfy/releases/download/v0.0.1/clomfy-Setup-0.0.1.exe)
- OS X [Download ver 0.0.1](https://github.com/MayGo/clomfy/releases/download/v0.0.1/clomfy-0.0.1.dmg) 
- Linux [Download ver 0.0.1](https://github.com/MayGo/clomfy/releases/download/v0.0.1/clomfy-0.0.1-x86_64.AppImage) 

# Features

- Apps board
- Stop/Start/Restart app
- View app data as JSON
- View notifications
- Buildpacks list

# Features to be implemented

- App board
- Change app settings (instances/memory)

# Made with

- [Electron](https://electron.atom.io/) with [Webpack](https://webpack.github.io/) and [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Material UI](http://www.material-ui.com/) 

# Screenshots

![Login](https://github.com/MayGo/clomfy/raw/master/screenshots/clomfy-login.png "Login")

![Apps board](https://github.com/MayGo/clomfy/raw/master/screenshots/clomfy-apps-board.png "Apps board")

![View app json data](https://github.com/MayGo/clomfy/raw/master/screenshots/clomfy-app-json.png "View app json data")

![Notifications](https://github.com/MayGo/clomfy/raw/master/screenshots/clomfy-notifications.png "Notifications")

# Donations 

This project needs you! If you would like to support this project's further development, feel free to donate. 
Your donation is highly appreciated. Thank you!

Feel free to make feature requests and 'Star' this project.

[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=MayGo&url=https://github.com/MayGo/clomfy&title=Clomfy&language=en_GB&tags=github&category=software)

<a href='https://pledgie.com/campaigns/31267'><img alt='Click here to lend your support to: Clomfy and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/31267.png?skin_name=chrome' border='0' ></a>

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JAHHBZZCZVDMA)


Development
---

### Quick Start
> Prerequisites: [Node](https://nodejs.org/), [Git](https://git-scm.com/).

```bash
git clone https://github.com/Maygo/clomfy.git  # Download this project

npm install yarn -g     # install yarn or binary from https://yarnpkg.com

yarn install            # Install dependencies

```
### Start application
#### Aurelia client (renderer)
```
cd client/
nps run
```
#### Electron (main)
```
cd electron/
nps run
```

# License
GNU General Public License v2.0
2017 MayGo @ [trimatech.ee](http://trimatech.ee)


