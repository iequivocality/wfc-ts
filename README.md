# wfc-ts (Wave Function Collapse in TypeScript)

This is my attempt to recreating the [Wave Function Collapse](https://github.com/mxgmn/WaveFunctionCollapse) algorithm in TypeScript.

Wikipedia has a great [article](https://en.wikipedia.org/wiki/Wave_function_collapse) on the algorithm.

> In quantum mechanics, wave function collapse, also called reduction of the state vector, occurs when a wave function—initially in a superposition of several
> eigenstates—reduces to a single eigenstate due to interaction with the external world.

## Concepts

## Objects

Renderer - renders the generated "wave" function to the canvas
Wave<T, C> - handles the wave function and tiles
Tile<T, C> - handles rotation and constraint checks, also handles propagation
Cell<T, C> - contains the entropy and the state of the cell (collapsed/observed)

## Terminologies

- Unobserved - each cell has an initial unobserved state (in quantum mechanics, it means that the cell is in a superposition of all possible states)
- Observation - choosing from one of the possible states from a "random" cell
- Propagation - changing the possible states of all cells based on the state of the recently observed cell
- Entropy - amount of possible states in the

## Implementation

## TODO for Simple Tile Model

- [x] Show images at random
  - [ ] Create tile images. 48x48 pixels
  - [ ] Create canvas of specific size (for now must be multiple of 48)
  - [ ] Add images to canvas of specified size
- [ ] Initialize image as the combination of all colors in the images (to represent the output in a completely observed state)

## References:

[Original Algorithm](https://github.com/mxgmn/WaveFunctionCollapse)
[Wave Function Collapse Explained - Boris the Brave](https://www.boristhebrave.com/2020/04/13/wave-function-collapse-explained/)
