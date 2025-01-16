Example: 

```js
    <App height={600}>
        <WindowProvider>

            <Window title="Mixed components" x={10} y={10} onClose={() => { }} >
                <Text label='Hello' />
                <ButtonGroup>
                    <Button label='Button' onClick={() => { }} />
                    <Button label='Button 2' onClick={() => { }} />
                    <Button label='Button 3' disabled onClick={() => { }} />
                </ButtonGroup>
                <ButtonGroup vertical>
                    <Button label='Button 4' onClick={() => { }} />
                    <Button label='Button 5' onClick={() => { }} />
                </ButtonGroup>
            </Window>

            <Window title="Label styles" onClose={() => { }} x={150} y={200}>
                <Text label='Hello' />
                <Text label='Hello' bold blink />
                <Text label='Hello' bold backgroundColor="green" />
            </Window>

            <Window title="Window 3" x={250} y={300} onClose={() => { }} >
                <Box>
                    <Text label='Box Border' />
                </Box>
                <Box type='inset' vertical>
                    <Text label='Box inset' />
                    <ProgressBar progress={50} max={100} />
                </Box>
            </Window>
            
        </WindowProvider>
    </App>
```