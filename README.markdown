![Tangerine](https://github.com/Tangerine-Community/Tangerine/raw/develop/app/_attachments/images/tangerine_logo.png)

A tablet/phone application for assessing students

Tangerine is a couchapp (http://couchapp.org/page/index) that uses 
couchdb (http://couchdb.apache.org/) for a more streamlined process

#### Getting Started - Mac
This guide is for snow leopard (Mac OS 10.6.x)

##### 1. Install xcode, homebrew, git and ruby
<http://moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/>

Use the command

    brew doctor
    
to make sure everything is correct. When you have all the above installed 
and brew reports "Raring to Brew" you should be ready to move on.
Some known problems that can occur:
- Problem: Problem with the pathing of redundant config files. 
- Solution: Solved by moving them away from the root directory. 

- Problem: Error running 'make'
- Solution: Run all the updates for brew, git, ruby, etc.

##### 2. Install additional programs:
Couchapp

    sudo brew install pip
    sudo env ARCHFLAGS="-arch i386 -arch x86_64" pip install couchapp

Coffeescript compiler:

    http://www.blog.bridgeutopiaweb.com/post/how-to-install-coffeescript-on-mac-os-x/

Ruby

    rvm install 1.9.3

Watchr

    gem install watchr

Rake

    gem install rake


##### 3. Build couchdb

Follow the instructions on this page to install CouchDB:

<http://wiki.apache.org/couchdb/Installing_on_OSX>

##### 4. Ensure that couchdb is running
Go to the couchdb server that should now be running on your machine:

http://localhost:5984/_utils

##### 5. Get Tangerine
Using github create a local clone of the tangerine repository.

    git clone https://github.com/Tangerine-Community/Tangerine.git

##### 6. Init the js filesystem to minify files
cd to the app/_attachments/js dir and run init.js

##### 7. Create a .couchapprc file in the app directory

Edit USERNAME and PASSWORD

    { "env":
      { "default"    : {"db": "http://USERNAME:PASSWORD@localhost:5984/tangerine"}
      }
    }


##### 8. Deploy the tangerine source code to your local CouchDB
Go to the Tangerine directory that you just cloned into and push:

    cd Tangerine
    couchapp push

Check that it is working by looking at the debug version at <http://localhost:5984/tangerine/_design/ojai/index-dev.html>.
The deploy version - with a minimised app.js - is at  <http://localhost:5984/tangerine/_design/tangerine/index.html>

If not check for error message from your couchapp push command. You can also look at the couchdb log file.

##### 9. Setup automatic pushing
From the Tangerine directory run:

    watchr file.watchr

watchr will watch all files in your Tangerine directory. When they change it will compile any coffeescript that has been updated and then push the changes to the couchdb.

If you are developing for pouchdb project based on Tangerine, the script also copies the coffee file and generated .js
file to the tangerine-pouch/www/ directory when a .coffee file is modified. Comment this out if you do not want this to happen.

#### Getting Started - Windows (TODO)

We have not done this yet, so we need help in documenting this section. Some things to try:

- Use a virtual box to run linux
- Use a windows build of couchdb along with:
    - cygwin for python and ruby or
    - <https://github.com/downloads/couchapp/couchapp/couchapp-0.8.1-win.zip>
    - not sure how to do coffeescript

----

Copyright (C) 2012  Michael McKay

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
