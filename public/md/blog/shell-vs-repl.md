#+META:title REPLs and why they'll never convince someone to try a Lisp
#+META:time 10
#+META:date Saturday Feb 8th, 2025

When people talk about programming in Lisps, one of the things often touted is the ability to
work at a REPL. If you've never used a lisp, this sounds wholly unimpressive. Pop open a terminal
and type `python` or `node` and you get a REPL. Tons of languages have them these days, and
everyone knows that these aren't really useful for anything other than testing small little
snippets of code. No one would consider writing more than a couple lines in here, and anything
remotely significant is better off being written in an editor. Another word for this type of
interaction is a shell. When you opened that terminal, it likely dropped you into a bash or a zsh
shell (or bat or fish or whatever...). Java has a "REPL" in the form of `jshell`. For the rest of
this article, what you've used in the past is going to be refered to as a "shell". The `python`
command drops you into a python shell, the `node` commands drops you into a JavaScript shell.
I say this because I want to seperate the two concepts for this article - for the sake of clarify
in language, a shell and a REPL are not necessarily the same thing. All REPLs are shells, but not
all shells are REPLs.

