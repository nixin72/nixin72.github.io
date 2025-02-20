---
title: REPLs and why they'll never convince someone to try a Lisp
time: 10
date: Feb 19th, 2025
---

When people talk about programming in Lisps, the first thing you'll hear being
touted is macros and how they're magic or alien, or some other weird crap. Not
a selling point. The second things often
[talked about](https://clojure.org/about/dynamic) is
[the ability](https://news.ycombinator.com/item?id=36888648) to
[work at a REPL](https://wiki.c2.com/?SmugLispWeenie#:~:text=Lispers%20insist%20on%20splattering%20code%20all%20over%20this%20Wiki%20in%20some%20vague%20attempt%20to%20win%20acolytes%2C%20one%20supposes.%20Code%20examples%20do%20not%20help%20to%20explain%20how%20the%20development%20cycle%20is%20%22different%2C%22%20which%2C%20one%20presumes%2C%20implies%20%22improved.%22%20As%20a%20simple%20example%2C%20what%20the%20heck%20does%20REPL%20mean%3F!%3F).
If you've never used a lisp before, this also sounds very unimpressive. Pop
open a terminal and type `python` or `node` and you get a REPL too. Tons of
languages have them these days, and everyone knows that these aren't really
useful for anything other than testing small little snippets of code.

```js
$ node
Welcome to Node.js v22.13.1.
Type ".help" for more information.
> console.log("Hello World");
Hello World
undefined
```

No one would really consider writing more than a couple lines in here, and
anything remotely significant is better off being written in a real editor.

Another word for this type of interaction is a shell. When you opened that
terminal, it likely dropped you into a bash or a zsh shell (or bat or fish or
whatever...). Java even has a "REPL" in the form of `jshell`. I think the terms
"shell" and "repl" are deserving of a distinction, because for most developers
they probably mean the same thing. But when a Lisp developer is talking about a
REPL, they mean something entirely different.

## What is a Shell?

A *shell* is a type of program that you would normally interact with at a
terminal. The bash shell, python shell, that sort of thing. You type in an
expression, hit enter, and it provides you with the output and return value.
In most shells (all?), you can load your code or dependencies into it too, and
experiment with code defined in them.
```js
$ node
Welcome to Node.js v22.13.1.
Type ".help" for more information.
> let _ = require("underscore");
undefined
> _.each([1,2,3], x => console.log(x));
1
2
3
[ 1, 2, 3 ]
>
```

You can interact with lisps through these shells too:

```clj
❯ clj
Clojure 1.12.0
user=> (println "Hello World")
Hello World
nil
user=>
```

Where shells fall short though is that the code written in them is ephemeral.
You close the terminal process and everything you did is gone. In any remotely
large program, we can't paste code from a shell into our IDE all the time and
swap between the two. They're two entirely different contexts when dealing with
a shell. A REPL is a tool that aims to bridge this gap.

## What's a REPL then?

A REPL is another type of tool for interactive development, but unlike a shell,
you never leave your editor and your codebase. Using a plugin for your IDE, you
start a process that will act as a sort of empty runtime environment. This is
the equivalent of starting a shell at a terminal and having nothing running
inside it. Then, you load your entire program into this REPL process. In shells
you can import your code and run it, or pull in dependencies and play around
with them, but this is usually where things fall apart in terms of
similarities. You can *run* the code in a shell, but you can't *edit* it. That
makes them not a super practical tool for the most part. In a REPL though,
you're still inside your editor, in your code files. Each expression in your
program is one that can be sent to the REPL and executed in this runtime
containing your application state.

In Clojure this might look something like:

1) Open VSCode
2) `Calva: Start a Project REPL and Connect`
3) `Calva: Load/Evaluate Current File and its Requires/Dependencies`
4) Edit some code
5) `Calva: Evaluate Top Level Form`
6) Repeat 4-6

This will take the current "form" that your cursor is on - maybe a function,
maybe a stray println outside of any function, a type definition, whatever you
want, and will send it to the REPL. A new function definition would be added to
the running application state. Updating a function will replace the definition.
Any random code will just get executed like normal against the state of the
application. Using a REPL, code that you're writing in your editor can be run
immediately, without recompiling anything except the function(s) that changed,
and have the output shown immediately, inline with the code.

## Why?

REPLs are great tools for reducing feedback cycles, ad-hoc testing, and
exploratory programming. Consider a normal workflow when developing in C++ or
Java. You open your editor, Eclipse or Vim or whatever, write some code, then
hit a button to run your program. This will trigger a predefined main method to
run, and you've gotta work your way through the application state to get to the
actual function you want to test. Now, if you're working on any sort of large
or serious project, you're probably not running through the whole application
workflow every time you make a small change, you're probably hopping over to a
unit testing file and running a test that you're developing alongside your
code. This is often called the "write compile run" cycle.

The goal of interactive development with a REPL is to, in a sense, merge these
phases together in a way that shortens the feedback cycle, and somewhat removes
the "compile" part of the cycle. When you're writing code in Clojure or Lisps,
you open your editor, and then load your REPL. Then, when you edit your code,
you can *just* run exactly what changed, and test it right there in the source
file. Let's say you want to add a new function to your program. In Clojure,
we might actually first start with instead writing a `let` block:

```clj
(let [arg-1 "some-value"
      arg-2 "some-other-value"]
  (str arg-1 " " arg-2))
```

Here we have a block that defines two variables, `arg-1` and `arg-2`, then
concatenates the strings together with a space between them, and outputs the
result of that concatenation. If you write this code, then run the evaluate
command in your editor, you'll see the output of this inline with your code:
`"some-value some-other-value"`. Let's say we want to write a function to
transform an identifier from Clojure's `kebab-case` into Java's `camelCase`.
We'll start with
```clj
(let [identifier "kebab-case"]
  (str/split identifier #"-"))
```
Then we run our eval command and see `["kebab" "case"]` printed inline. Now, we
want to capitalize the `Case` here.
```clj
(let [identifier "kebab-case"]
  (let [parts (str/split identifier #"-")]
    (str (first parts) (str/upper-case (second parts)))))
```
Now we've defined a second `let` here since the first one is mimicing arguments
to our function, and the second one is the actual body of our function. So we
define a variable that'll contain a list of all the parts of our identifier.
Then we return the concatenation of the first part of the list (`kebab`) and
upper case the second element (`case`) and we'll get `kebabCASE` printed.
Oops, we made an obvious mistake, let's change that `str/upper-case` to
`str/capitalize`:
```clj
(let [identifier "kebab-case"]
  (let [parts (str/split identifier #"-")]
    (str (first parts) (str/capitalize (second parts)))))
```
Now when we run this we'll see `kebabCase`. Great, now before we turn this into
a function, we'll throw a couple more inputs at it.
```clj
(let [identifier "kebab-case-name"]
  (let [parts (str/split identifier #"-")]
    (str (first parts) (str/capitalize (second parts)))))
```
Still returns `kebabCase` cause we're of course ignoring anything after the
second element of the vector. So we can change this to:
```clj
(let [identifier "kebab-case-name"]
  (let [parts (str/split identifier #"-")]
    (str (first parts) (str/join (map str/capitalize (rest parts)) ""))))
```
And now this will capitalize every element after the first, join it together
into a string, then concatenate it with the first part. This will now return
`kebabCaseName` as we'd expect.
Now all we have to do is turn it into a function:
```clj
(defun kebab-case-to-camelCase [identifier]
  (let [parts (str/split identifier #"-")]
    (str (first parts) (str/join (map str/capitalize (rest parts)) ""))))
```
And this code is ready to run. By writing code like this, we can iterate really
quickly, and build functions interactively. Any time you make a change to this
definition, you just run the eval command in your editor (in my case `, e`),
and see the output right away.

## Interactive Programming

A REPL is a tool for improving interactive development in Clojure and Lisps.
But it's not the only sort of tool for interactive development out ther. If
you're working in web development, odds are you already get some parts of this
in the tools you're using.

Most front-end work these days happens through some sort of framework like
React or Vue. If you're writing code in React, you pop open your terminal, run
`npm start`, then just write your code. You make changes, save a file, and it's
automatically refreshed in your browser. You don't have to recompile a whole
program, and your state is maintained (as much as possible) between code
changes. Browser devtools are also amazing for interactive programming. Open
and element in the inspector and changing it's styles is a great way to figure
out what CSS you need to make things look right.

The front-end development experience is very streamlined, and backend
development experiences are improving too. A lot of languages support
hotswapping backend code now - Java Spring supports hot swapping through their
devtools and Nodejs has it throught nodemon. When hotswapping code, when you
save changes, they're automatically loaded into your running application, so
you just have to save your file, then hit your API endpoint to test the changes.
You don't have to restart your application or reload test data from a database
or anything like that. State is maintained.

This is great news for web developers, but not everyone is building frontends
or writing API endpoints. A REPL brings this sort of interactive development to
*every* part of your codebase, no matter what type of application you're
writing. It doesn't matter if it's a basic CRUD application, data processing
pipelines in banking applications, or embedded code for a microcontroller.

## Network REPLs

REPLs are great tools for debugging too. When building concurrent systems that
are supposed to run for long periods of time, one of the best way to test them
effectively is through [deterministic simulation](https://blog.redplanetlabs.com/2021/03/17/where-were-going-we-dont-need-threads-simulating-distributed-systems/).
But, simulated testing requires mocking a lot of away, and can't cover every
scenario. So, some amount of real testing is required. Setting up a real
server, and throwing load at it to imitate a production environment.

When things go wrong in this sort of situation, a test fails, we hit a fatal
exception, etc., we're all used to slogging through log files to see what went
wrong. But sometimes it's not entirely clear. Maybe your logging wasn't
thorough enough, maybe your log level was set too high, maybe you're unsure
how to reproduce the issue. Either way, you've missed the problem. Now, you
have to take down your application, change your logging, and hope your
application gets back to the state necessary to reproduce.

REPLs however can often be connected to over a network. When starting a REPL
in your editor, you can connect to a port to another REPL running elsewhere,
and use it's current state. Connecting to a REPL on a broken system in a test
environment like this gives you unparalled levels of insight into what went
wrong. You can poke around the internals of the application as much as you
want, look at the state of various components, add logging anywhere to
monitor the issue if it's persisting or ongoing, sometimes even reproduce the
issue over and over from the broken state that caused it to happen. When I was
working on Rama for Red Planet Labs, using REPLs over a network was an
invaluable debugging tool for our
[chaos testing](https://blog.redplanetlabs.com/2023/10/24/how-rama-is-tested-a-primer-on-testing-distributed-systems/#Chaos_testing_on_real_clusters).
It helped us catch a lot of problems that otherwise might've been missed
because we just didn't have the logging in place to catch something.

## Conclusion

If you're not a Lisp developer, I hope this helped shed some sort of light on
what a REPL actually is and why it's useful. No, it's not like Python's or
node's "REPL", and any examples you might see where someone is clearly typing
at a shell prompt is *not* how REPLs are usually interacted with in Lisps.
They're a great tool for shortening the feedback cycle when writing code,
doing ad-hoc testing, exploratory programming, and facilitating debugging.
It brings the sort of interactive development experience you get when writing
frontend code to every line you write in any type of application.

If you are a Lisp developer, you probably didn't really learn anything from
this little spiel. But, when talking to others, be aware of the language you
use and what the words mean to [*others*](https://xkcd.com/2501/). Everyone has
"a REPL", so it's not a selling point just using that word over and over again.
Without explaining what that means, it sounds like you're telling people to
write code in a shell (and it doesn't help when people try to explain a REPL
by sharing screenshots or code samples clearly typed at a shell). Stop
telling people what READ-EVAL-PRINT-LOOP means like they've never opened a bash
shell and start telling people about the benefits of interactive programming.