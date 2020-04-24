import React, {useReducer} from "react";

import {CommonContentTemplate} from "../../features/common/templates";
import {
    Button,
    Input,
    Checkbox,
    CheckboxWithLabel,
    FlexContainer,
    RadioGroup,
} from "../../ui";

function reducerButton(state, action) {
    switch (action.type) {
        case 'disabled':
            return {...state, disabled: !state.disabled};
        case 'loading':
            return {...state, isLoading: !state.isLoading};
        default:
            throw new Error();
    }
}

export const StorybookPage = () => {
    const initStateButton = {
        disabled: false,
        isLoading: false
    }
    const [stateButton, dispatchButton] = useReducer(reducerButton, initStateButton);

    const handleClickButton = () => {
        alert('click on button')
    }
    const onChangeDisabled = () => {
        dispatchButton({type: 'disabled'})
    }
    const onChangeLoading = () => {
        dispatchButton({type: 'loading'})
    }

    return (
        <CommonContentTemplate>
            {/*<h2 style={{textAlign: 'center'}}>Storybook</h2>*/}

            {/*<h2>Button</h2>*/}

            {/*<FlexContainer>*/}
            {/*    <div style={{width: '300px'}}>*/}
            {/*        <Button*/}
            {/*            onClick={handleClickButton}*/}
            {/*            isLoading={stateButton.isLoading}*/}
            {/*            disabled={stateButton.disabled}*/}
            {/*        >*/}
            {/*            Test*/}
            {/*        </Button>*/}
            {/*        <br/> <br/>*/}
            {/*        <Button*/}
            {/*            variant={'outlined'}*/}
            {/*            color="primary"*/}
            {/*            onClick={handleClickButton}*/}
            {/*            isLoading={stateButton.isLoading}*/}
            {/*            disabled={stateButton.disabled}*/}
            {/*        >*/}
            {/*            Test*/}
            {/*        </Button>*/}
            {/*        <br/> <br/>*/}
            {/*        <Button size="small" >Small</Button>*/}
            {/*        <br/> <br/>*/}
            {/*        <Button size="medium" >Medium</Button>*/}
            {/*        <br/> <br/>*/}
            {/*        <Button size="large" >Large</Button>*/}
            {/*        <br/> <br/>*/}
            {/*        <Button*/}
            {/*            variant="contained"*/}
            {/*            color="secondary"*/}
            {/*            startIcon={<Delete />}*/}
            {/*        >*/}
            {/*            Delete*/}
            {/*        </Button>*/}
            {/*        <br/><br/>*/}
            {/*        <Button*/}
            {/*            variant="contained"*/}
            {/*            color="primary"*/}
            {/*            endIcon={<Send />}*/}
            {/*        >*/}
            {/*            Send*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <CheckboxWithLabel*/}
            {/*            onChange={onChangeDisabled}*/}
            {/*            label={'Disabled'}*/}
            {/*        />*/}
            {/*        <CheckboxWithLabel*/}
            {/*            onChange={onChangeLoading}*/}
            {/*            label={'Loading'}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</FlexContainer>*/}

            {/*<h2 style={{marginTop: '40px'}}>Input</h2>*/}
            {/*<FlexContainer>*/}
            {/*    <div style={{width: '300px'}}>*/}
            {/*        <Input*/}
            {/*            label='label'*/}
            {/*            placeholder='placeholder'*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}

            {/*    </div>*/}
            {/*</FlexContainer>*/}

            {/*<RadioGroup />*/}
            {/*<SwitchWithLabel label={'test label'} />*/}

        </CommonContentTemplate>
    )
}