## Version 0.2.12 (29/01/2017)
  
  - Add `#pragma push_macro(..)` command (thanks to @zohl)
  - Add `#pragma pop_macro(..)` command (thanks to @zohl)
  - Fix issue: comment in `#define` directive (thanks to @zohl)
  - Add `-v` and `--version` to show the version in the CLI


## Version 0.2.11 (29/01/2017)
  
  - Add `-c` and `--config` to specify a configuration file in the CLI (thanks to @zohl)
  - Add `-h` and `--help` to show the usage in the CLI (thanks to @zohl)


## Version 0.2.10 (05/01/2017)

  - Add `__LINE__` and `__FILE__`
  - Rename `options.endLine` to `options.newLine`
  - Make optional the second argument of the CLI
  - Tidy a bit the source code
  - Fix issue: Replace line endings from CRLF to LF for macOS
  - Fix issue: directives with a whitespace between # and their name


## Version 0.2.9 (17/12/2016)

  - Update README.md
  - Add `__TIME__` and `__DATE__` constants
  - Add `#error` directive
  - Clean unit tests


## Version 0.2.8 (08/12/2016)

  - Make **C-Preprocessor** a bit faster for parsing lines
  - Add `options.constants` for adding predefined constants
  - Add `options.macros` for adding predefined macros
  - Fix issue: macros with another macro with several parameters


## Version 0.2.7 (19/08/2016)

  - Fix issue: multiple calls of success event
  - Fix issue: the last line of the file wasn't parsed
  - Set `options.includeSpaces` to `0` by default
  - Fix CLI command


## Version 0.2.5 (18/08/2016)

  - Complete rewriting of Compile-Js-like-C
  - Rename **Compile-Js-like-C** to **C-Preprocessor**
  - Add `#if` command
  - Add `#pragma once` command
  - Add unit tests (run `npm test`)


## Version 0.1.2 (07/01/2016)

  - Fix end of lines
  - Fix macros and constants system


## Version 0.1.1 (07/06/2015)

  - Clean a bit the code by separating in several files


## Version 0.0.7 (11/03/2015)

  - Add CLI command
  - Add `examples` folder


## Version 0.0.5 (10/03/2015)

  - Update README.md and add usage


## Version 0.0.2 (10/03/2015)

  - Initial release