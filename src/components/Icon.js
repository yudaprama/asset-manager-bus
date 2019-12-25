import React from 'react';
import {
	Image,
	TouchableOpacity
} from 'react-native';

export default ({style,s,source,onPress}) => (
	<TouchableOpacity onPress={()=> onPress()} style={[{alignSelf: 'center'}, s]}>
    <Image style={style} source={source} />
  </TouchableOpacity>
)