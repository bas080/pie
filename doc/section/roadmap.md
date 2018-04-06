# Roadmap

## Use flow's libdef feature

Instead of having the type definitions be lost during a build, I want to use
the libdef feature. That way the examples can also be typechecked and using
a libdef we no longer need to strip the types from the source.

Furthermore users of this lib can leverage flow types in their own project.

- write a [libdef](https://flow.org/en/docs/libdefs/creation/)
- remove `.*/doc` from `.flowconfig`'s ignore section
- remove the build script from the `package.json` and chance its main module

