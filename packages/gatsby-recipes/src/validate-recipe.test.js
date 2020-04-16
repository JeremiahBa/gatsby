const validateRecipe = require(`./validate-recipe`)

describe(`validate module validates recipes with resource declarations`, () => {
  it(`validates File declarations`, () => {
    const recipe = [
      {},
      { File: [{ path: `super.md`, content: `hi` }] },
      { File: [{ path: `super-duper.md`, contentz: `yo` }] },
    ]
    const validationResponse = validateRecipe(recipe)
    expect(validationResponse).toMatchSnapshot()
    expect(validationResponse[0].validationError).toMatchSnapshot()
  })

  it(`validates NPMPackage declarations`, () => {
    const recipe = [{}, { NPMPackage: [{ namez: `wee-package` }] }]
    const validationResponse = validateRecipe(recipe)
    expect(validationResponse).toMatchSnapshot()
  })

  it(`returns empty array if there's no errors`, () => {
    const recipe = [
      { File: [{ path: `yo.md`, content: `pizza` }] },
      { NPMPackage: [{ name: `wee-package` }] },
    ]
    const validationResponse = validateRecipe(recipe)
    expect(validationResponse).toHaveLength(0)
  })
})
