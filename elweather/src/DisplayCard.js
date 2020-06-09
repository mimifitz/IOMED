import React from "react";
import "@elastic/eui/dist/eui_theme_dark.css";
//import "@elastic/eui/dist/eui_theme_light.css";
import { EuiCard, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

class DisplayCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

            <EuiFlexGroup gutterSize="l">
                <EuiFlexItem>
                    <EuiCard
                        layout="vertical"
                        title={"Elastic Beats"}
                        description="This card adds uses an 'xl' size icon which works well in a horizontal layout."
                    />
                </EuiFlexItem>

                <EuiFlexItem>
                    <EuiCard
                        layout="vertical"
                        titleSize="xs"
                        title={"Elastic Cloud"}
                        description="This card uses an 'l' size icon but also shrinks the 'titleSize' to 'xs'."

                    />
                </EuiFlexItem>
            /</EuiFlexGroup>
        );
    }
}

export default DisplayCards;