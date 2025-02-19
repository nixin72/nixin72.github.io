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
You can interact with lisps through these shells too:

```clj
❯ clj
Clojure 1.12.0
user=> (println "Hello World")
Hello World
nil
user=>
```

When talking about *REPLs* though, this is not what's usually meant.

## What's a REPL then?

Let's think about front-end web development first. While it's something that
tons of people hate for a myriad of reasons, one good thing about it is that
it's got a very nice feedback cycle.

If you're in a browser, you can open the development tools and use the console
there to make changes to your program.

```js
> document.querySelectorAll(".x").forEach(el => el.innerHTML = "");
```

You can delete every element with the class `x` while maintaining state like
login status, cookies, sessions, or even the content of inputs. This is nice
for exploratory programming or debugging sometimes, but not super practical
beyond that since editing code outside of your editor is always bound to have
something lost if you try doing too much. But even if *this* isn't super
practical, front-end development as a whole still has very good interactive
development.

Most front-end work these days happens through some sort of framework like
React or Vue. If you're writing code in React, you pop open your terminal, run
`npm start`, then just write your code. You make changes, save a file, and it's
automatically refreshed in your browser. You don't have to recompile a whole
program, and your state is maintained (as much as possible) between code
changes.

The front-end development experience is very streamlined, and backend
development experiences are improving too. A lot of languages support
hotswapping backend code now - Java Spring supports hot swapping through their
devtools and Nodejs has it throught nodemon. Python struggles with hot swapping
though there are rudimentary ways to do it, but not everyone's got it. When
hotswapping code, changes you make to your code are automatically loaded into
your running application, so you just have to save your file, then hit your
API endpoint to test the changes. You don't have to restart your application
reload test data from a database or anything like that. State is maintained.

This is great news for web developers, but not everyone is building frontends
or writing API endpoints. Consider you work in investment banking, and you're
building systems in C++ to validate data on trades being made. You've got a
test database to pull data from, but you want to be testing what happens after
a ton of that data has gone through a transformation pipeline, including an
aggregation of it at the end. Without hotswapping code, you'd need to recompile
and restart your program every time you want to test changes, reload the data
from the database, then run it through your transformation pipeline all to test
some logic working on the output of that aggregation. There's a lot of work to
be done here every time you make small change to your code, and it can be very
time consuming testing small changes.

If you have hot swapping though, you can potentially forego all of that, and
set up some state containing the output of the aggregation, then run a single
test against the output.

Here, we're creating a generic singleton instance to store our test state, and
then upon running out main function to test the code, we just use the value in
our singleton.

`TestState.cpp`:
```cpp
template <typename T>
class TestState {
protected:
  TestState(const T value): value_(value) { }

  static TestState* singleton_;
  T value_;

public:
  TestState(TestState &other) = delete;
  void operator=(const TestState &) = delete;
  static TestState *GetInstance();

  T value() const { return value_; }
};

TestState* TestState::singleton_= nullptr;;

TestState *TestState::GetInstance() {
  if(singleton_ == nullptr){
    T value = runDataAggPipeline();
    singleton_ = new TestState(value);
  }
  return singleton_;
}
```
`Test.cpp`:
```cpp
int main() {
  T aggregatedValue = TestState::GetInstance();
  // ... perform work on aggregatedValue
}
```

Now, any time you make changes to `Test.cpp`, you can just reload the
singleton's value and test your changes, without spending several seconds
waiting for the data to be in the state you need. This is very useful for
ad-hoc testing, but setting up a singleton like this to test small changes
every time might be pain in the ass.

This is where the REPL comes in. It shines for ad-hoc testing and exploratory
programming. Let's rewrite the above in Clojure:

```clj
(defonce test-state (run-data-agg-pipeline))

(let [aggregated-value test-state]
  ;; ... perform work on aggregated value
  )
```

With Lisps, each expression can be recompiled individually - you don't even
have to compile things one file at a time. I'll talk about Clojure specifically
since that's where I have the most experience, but the same is true for Common
Lisp. When you open your IDE for Clojure development, the first thing you're
probably going to do is start a REPL - this will be inside your editor, and
connected to your code. The whole program is run through your REPL, so it
contains everything in your codebase. Then, writing code inside your editor,
you can "send it" to your REPL. In VSCode, you'd probably be using the Calva
extension, and that would look something like this:

1) run `Calva: Start a Project REPL and Connect`
2) run `Calva: Load/Evaluate Current File and its Requires/Dependencies`
2) Edit your code
3) run `Calva: Evaluate Top Level Form`

This will recompile *only* the current top-level expression. In the case of the
snippet above, the `let`. So you can make changes to the contents of the `let`
block, then run that evaluate command (in my case bound to `, e`), and see it's
output immediately in a window inside VSCode. The feedback is instantaneous.
And you can do this with any type of development, there are no restrictions on
the features of Clojure that can be run through a REPL like some languages
impose on their shells.

The REPL is a very useful tool for driving a different type of approach to
writing code called interactive programming. When writing in Clojure, you start
your REPL once and then you get instant feedback on any code you write. The
only time you need to actually recompile your code is when adding dependencies
(which has been fixed by clojure 1.12.0), and the rare times that your REPL
gets into some sort of broken state[^1].

## Conclusion

If you're not a Lisp developer, I hope this shed some sort of light on the
argument of "oh, well lisps have this REPL that's really great for programming"
and you probably just rolled your eyes at them. No, it's not like the Python
REPL, and it's nothing like IDLE. It's just a good tool for shortening the
feedback cycle when writing code. It brings the sort of interactive development
experience you get when writing frontend code to every line you write in any
type of application.

If you are a Lisp developer, you didn't really learn anything new from this
little spiel. But, when talking to others, be aware of the language you use and
what the words mean to [*others*](https://xkcd.com/2501/). Everyone has
"a REPL", so it's not a selling point just using that word over and over again.
Without explaining what that means, it sounds like you're telling people to
write code in a shell.

---

[^1] How you can break your REPL state is out of scope of the discussion here,
but it's fairly uncommon. While purely annecdotal, I was working on one of the
largest Clojure codebases in the world, and on average probably only restarted
my REPL once or twice a week. Occasionally I'd work on something that would
break it with greater frequency, but it was a massively complex codebase with
lots of moving parts.