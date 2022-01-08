example for operation: `5-2+30/15-20`

`OperationTree`:
```js
data: [
	5,
	'-',
	2,
	'+',
	30,
	'/',
	15,
	'-',
	20
]
```

`PriorityOperationTree`:
```js
data: [
	5,
	'-',
	2,
	'+',
	[
		30,
		'/',
		15
	],
	'-',
	20
]
```

After these objects are formed, it will loop through the sorted priority queue (in this example, it does not matter) and get the resulting value `13`.