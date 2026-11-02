// SPDX-FileCopyrightText: Copyright 2026 Eden Emulator Project
// SPDX-License-Identifier: GPL-3.0-or-later

#version 450

layout(binding = 0) uniform sampler2D tex;

layout(location = 0) in vec2 texcoord;
layout(location = 0) out vec4 color;

void main() {
    const vec4 encoded = textureLod(tex, texcoord, 0);
    const vec3 low = encoded.rgb / 12.92;
    const vec3 high = pow((encoded.rgb + 0.055) / 1.055, vec3(2.4));
    color = vec4(mix(high, low, lessThanEqual(encoded.rgb, vec3(0.04045))), encoded.a);
}
