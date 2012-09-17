Install Nodejs on Ubuntu:

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs npm

    // if you install any modules with -g remember to add to PATH
    // shifter is the only one that needs -g (global) install 
    export NODE_PATH=/usr/lib/node_modules/
