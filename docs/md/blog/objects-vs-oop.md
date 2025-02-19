The term "object oriented programming" is something that I think we sometimes misuse when talking
about the use of objects. The word "oriented" in particular is important, because it implies that
an overall system is geared towards the use of objects or that there's some interconnection and
communication between objects that makes our system oriented towards the use of objects. And I
think that this "oriented" part of object-oriented, that's the bad part.

Objects on their own are nothing more than a way to hold various pieces of data together in a
container and act on that data, and that's a useful tool to have. But we get so caught up in the
"functions" vs "objects" language, that we forget that the import word isn't *objects* but the
*oriented* part. We can introduce a small handful of objects to our system to manage critical
state, so long as we don't start having several objects communicating together or the scope of
their control is ill-defined or we allow them to grow into a fully object-oriented system in it's
own right.

Languages like Go or Rust for example are not object-oriented. Go has structs with properties and
methods, and these structs can implicitely implement interfaces in Go, but entire programs aren't
build around these objects - they're used to encapsulate individual pieces of functionality for
something like a datastructure or an HTTP connection, where you have an object containing some
information and you have methods to act on it. The core of the code in Go is still just normal,
procedural, C-like code though. It's not object-oriented (nor is it particularly functional). So
just because something /has/ objects doesn't mean that it's object-/oriented/.
