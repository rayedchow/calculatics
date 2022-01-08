example for operation: `5-2+30-20`  

`OperationTree`:
```js
data: [
	5,
	'-',
	2,
	'+',
	30,
	'-',
	20
]
```

`PriorityOperationTree`:
```js
data: [
	{
		operation: [
			5,
			'-',
			2,
			'+',
			30,
			'-',
			20
		],
		priority: 3
	}
]
```

After these objects are formed, it will loop through the sorted priority queue (in this example, it does not matter) and get the resulting value `13`.