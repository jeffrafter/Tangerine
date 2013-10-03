require 'fileutils'

def push
  version = `git log --pretty=format:'%h' -n 1`

  File.open("_attachments/js/version.js", "w") {|f| f.write("window.Tangerine.version = \"#{version}\"\;") }

  # builds index-dev.html from files listed in uglify.js
  Dir.chdir( File.join Dir.pwd, "_attachments", "js" ) {
    `./uglify.rb dev`
  }
# Do this twice so you don't have to wait for uglify when in dev mode
  `couchapp push`

  Dir.chdir( File.join Dir.pwd, "_attachments", "js" ) {
    `./uglify.rb app`
  }
  `couchapp push`
end

def notify(type,message)
  `growlnotify -t "#{type}" -m "#{message}" -w`
  `notify-send "#{type} - #{message}" -i /usr/share/icons/Humanity/status/128/dialog-warning.svg &`
end

watch ( '.*\.coffee$' ) { |match|
  match = String(match)
  if match.index "translation.coffee"
    path = match.split("/")
    newFile = path[0..path.length-2].join("/")+"/translation.json"
    result = `coffee --bare --compile --print #{match}`
    bareJson = result.gsub(/[\;\(\)]|\/\/.*$\n/, '')
    File.open(newFile, "w") {|f| f.write(bareJson) }
  else
    puts "\nCompiling:\t\t#{match}"
    result = `coffee --bare --compile #{match} 2>&1`
    path = match.split("/")
    # Path:		["_attachments", "js", "helpers.coffee"]		File:		_attachments/js/helpers.coffee
    pouchDir = "../../tangerine-pouch/www/" + path[1..path.length-2].join("/")
    coffeeFilenameArray = path[path.length-1].split(".")
    sourceJsFileName = path[0..path.length-2].join("/") + "/" + coffeeFilenameArray[0] + ".js"
    pouchDirCoffeeFileName = pouchDir + "/" + coffeeFilenameArray[0] + ".coffee"
    pouchDirJsFileName = pouchDir + "/" + coffeeFilenameArray[0] + ".js"
    puts "\nSourceCoffeeFileName:\t#{match}\tCopyToPouch:\t#{pouchDirCoffeeFileName}"
    FileUtils.cp(match, pouchDirCoffeeFileName)
    puts "\nSourceJsFileName:\t#{sourceJsFileName}\tCopyToPouch:\t#{pouchDirJsFileName}"
    FileUtils.cp(sourceJsFileName, pouchDirJsFileName)
  end

  if result.index "Error: In"
    notify("CoffeeScript", result.gsub(/.*Error: In.*\/(.*\.coffee)/,"\\1"))
    puts "\n\nCoffeescript error\n******************\n#{result}"
  else
#    docco_result = `docco #{match}`
#    puts "\nDocco-menting:\t\t#{match}\n"
    push()
  end
}

watch ( '.*\.less$' ) { |match| 
  puts "\nCompiling:\t\t#{match}"
  result = `lessc #{match} --yui-compress > #{match}.css`
  if result.index "Error"
    notify("LESS error",result)
    puts "\n\nLESS error\n******************\n#{result}"
  else
    push()
  end
}

watch ( '.*\.css$|.*\.js$|.*\.html$|.*\.json$' ) { |match|
  if match.string().index("version.js") == nil && match.string().index("app.js") == nil
    puts "\nUpdating:\t\t#{match}\nPushing to couchapp\n\n"
    push()
  end
  match = String(match)
  path = match.split("/")
  pouchDir = "../../tangerine-pouch/www/" + path[1..path.length-2].join("/")
  filename = path[path.length-1]
  pouchFilepath = pouchDir + "/" + filename
  FileUtils.cp(match, pouchFilepath)
  puts "\nCopying FileName:\t#{match}\tTo Pouch:\t#{pouchFilepath}"
}

push()


