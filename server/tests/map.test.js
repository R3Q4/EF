import MapService from '../service/map.service.js'

// White Box Testing

test('Basis Path', async () => {
    const result = await MapService.nearest('d_7e1f0da76a744c85e3d3ecc76642dcb5', 'Outram', 'Blessings', 3)
    expect(result.length).toBe(1)
    expect(result[0].name).toBe("Blessings in a Bag")
    expect(result[0].address).toBe('315 Outram Road, Tan Boon Liat Building #08-06A')
})

test('Path 1', async () => {
    const result = await MapService.nearest('d_7e1f0da76a744c85e3d3ecc76642dcb5', null, 'Blessings', 3)
    expect(result.length).toBe(1)
    expect(result[0].name).toBe("Blessings in a Bag")
    expect(result[0].address).toBe('315 Outram Road, Tan Boon Liat Building #08-06A')
})

test('Path 2', async () =>  {
    const call = async () => await MapService.nearest('d_7e1f0da76a744c85e3d3ecc76642dcb5', 'Woodbands', 'Blessings', 3)
    await expect(call()).rejects.toThrow('Address not found')
})

// test('Path 3', async () => {
//     const result = await MapService.nearest('d_7e1f0da76a744c85e3d3ecc76642dcb5', 'Tan Boon Liat Building', null, 3)
//     const found = result.some(obj => obj.name == "Blessings in a Bag")
//     expect(found).toBe(true)
// })

test('Path 3', async () => {
    const call = async () => await MapService.nearest('d_7e1f0da76a744c85e3d3ecc76642dcb5', 'Outram', 'Existential', 3)
    await expect(call()).rejects.toThrow('No locations found')
})