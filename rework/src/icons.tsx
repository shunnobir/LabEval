type IconProps = {
  color?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
};

export function LogoutIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path
        fill={c}
        d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z"
      />
    </svg>
  );
}

export function LoginIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "24";
  const h = height ? height : "24";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill={c}
    >
      <path d="M10.3 7.7a.984.984 0 0 0 0 1.4l1.9 1.9H3c-.55 0-1 .45-1 1s.45 1 1 1h9.2l-1.9 1.9a.984.984 0 0 0 0 1.4c.39.39 1.01.39 1.4 0l3.59-3.59a.996.996 0 0 0 0-1.41L11.7 7.7a.984.984 0 0 0-1.4 0M20 19h-7c-.55 0-1 .45-1 1s.45 1 1 1h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-7c-.55 0-1 .45-1 1s.45 1 1 1h7z" />
    </svg>
  );
}

export function SettingsIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path
        fill={c}
        d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410-480q0-29 20.5-49.5T480-550q29 0 49.5 20.5T550-480q0 29-20.5 49.5T480-410Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z"
      />
    </svg>
  );
}

export function EventsCreateIcon({
  color,
  width,
  height,
  className,
}: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      stroke={c}
      fill={c}
    >
      <path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v301h-60v-111H180v430h319v60H180Zm709-219-71-71 29-29q8.311-8 21.156-8Q881-407 889-399l29 29q8 8.311 8 21.156Q926-336 918-328l-29 29ZM559-40v-71l216-216 71 71L630-40h-71ZM180-630h600v-130H180v130Zm0 0v-130 130Z" />
    </svg>
  );
}

export function EventsIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z" />
    </svg>
  );
}

export function DashboardIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M120-510v-330h330v330H120Zm0 390v-330h330v330H120Zm390-390v-330h330v330H510Zm0 390v-330h330v330H510ZM180-570h210v-210H180v210Zm390 0h210v-210H570v210Zm0 390h210v-210H570v210Zm-390 0h210v-210H180v210Zm390-390Zm0 180Zm-180 0Zm0-180Z" />
    </svg>
  );
}

export function PersonIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path
        fill={c}
        d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z"
      />
    </svg>
  );
}

export function ShortTextIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path fill={c} d="M160-390v-60h389v60H160Zm0-120v-60h640v60H160Z" />
    </svg>
  );
}

export function EventCreateYes({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z" />
    </svg>
  );
}

export function CancelIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
    </svg>
  );
}

export function ErrorIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M480-281q14 0 24.5-10.5T515-316q0-14-10.5-24.5T480-351q-14 0-24.5 10.5T445-316q0 14 10.5 24.5T480-281Zm-30-144h60v-263h-60v263ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm25-60h250l175-175v-250L605-780H355L180-605v250l175 175Zm125-300Z" />
    </svg>
  );
}

export function InfoIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M453-280h60v-240h-60v240Zm26.982-314q14.018 0 23.518-9.2T513-626q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447-626q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
    </svg>
  );
}

export function TipsIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M480-80q-34 0-57.5-23.5T399-161h162q0 34-23.5 57.5T480-80ZM318-223v-60h324v60H318Zm5-121q-66-43-104.5-107.5T180-597q0-122 89-211t211-89q122 0 211 89t89 211q0 81-38 145.5T637-344H323Zm22-60h271q48-32 76-83t28-110q0-99-70.5-169.5T480-837q-99 0-169.5 70.5T240-597q0 59 28 110t77 83Zm135 0Z" />
    </svg>
  );
}

export function BackButton({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" />
    </svg>
  );
}

export function ClockIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z" />
    </svg>
  );
}

export function ProblemCreateIcon({
  color,
  width,
  height,
  className,
}: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z" />
    </svg>
  );
}

export function ProblemCreateYesIcon({
  color,
  width,
  height,
  className,
}: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M120-331v-60h306v60H120Zm0-165v-60h473v60H120Zm0-165v-60h473v60H120Zm532 460L516-337l42-43 94 93 185-185 43 43-228 228Z" />
    </svg>
  );
}

export function FileAddIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M450-313v-371L330-564l-43-43 193-193 193 193-43 43-120-120v371h-60ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z" />
    </svg>
  );
}

export function EditIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" />
    </svg>
  );
}

export function DeleteIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path
        fill={c}
        d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"
      />
    </svg>
  );
}

export function RegistrationIcon({
  color,
  width,
  height,
  className,
}: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M730-400v-130H600v-60h130v-130h60v130h130v60H790v130h-60Zm-370-81q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40-160v-94q0-35 17.5-63.5T108-360q75-33 133.338-46.5 58.339-13.5 118.5-13.5Q420-420 478-406.5 536-393 611-360q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587-306q-71-33-120-43.5T360-360q-58 0-107.5 10.5T132-306q-15 7-23.5 21.5T100-254v34Zm260-321q39 0 64.5-25.5T450-631q0-39-25.5-64.5T360-721q-39 0-64.5 25.5T270-631q0 39 25.5 64.5T360-541Zm0-90Zm0 411Z" />
    </svg>
  );
}

export function CodeIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={color}
    >
      <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
    </svg>
  );
}

export function RegisteredIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M702-494 575-622l42-42 85 85 170-170 42 43-212 212Zm-342 13q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40-160v-94q0-35 17.5-63.5T108-360q75-33 133.338-46.5 58.339-13.5 118.5-13.5Q420-420 478-406.5 536-393 611-360q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587-306q-71-33-120-43.5T360-360q-58 0-107.5 10.5T132-306q-15 7-23.5 21.5T100-254v34Zm260-321q39 0 64.5-25.5T450-631q0-39-25.5-64.5T360-721q-39 0-64.5 25.5T270-631q0 39 25.5 64.5T360-541Zm0 251Zm0-341Z" />
    </svg>
  );
}

export function HomeIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "24";
  const h = height ? height : "24";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill={c}
    >
      <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1" />
    </svg>
  );
}

export function CloseEyeIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 1200 1200"
      fill={c}
    >
      <path
        fill={c}
        d="M669.727 273.516c-22.891-2.476-46.15-3.895-69.727-4.248c-103.025.457-209.823 25.517-310.913 73.536c-75.058 37.122-148.173 89.529-211.67 154.174C46.232 529.978 6.431 577.76 0 628.74c.76 44.162 48.153 98.67 77.417 131.764c59.543 62.106 130.754 113.013 211.67 154.174c2.75 1.335 5.51 2.654 8.276 3.955l-75.072 131.102l102.005 60.286l551.416-960.033l-98.186-60.008zm232.836 65.479l-74.927 129.857c34.47 44.782 54.932 100.006 54.932 159.888c0 149.257-126.522 270.264-282.642 270.264c-6.749 0-13.29-.728-19.922-1.172l-49.585 85.84c22.868 2.449 45.99 4.233 69.58 4.541c103.123-.463 209.861-25.812 310.84-73.535c75.058-37.122 148.246-89.529 211.743-154.174c31.186-32.999 70.985-80.782 77.417-131.764c-.76-44.161-48.153-98.669-77.417-131.763c-59.543-62.106-130.827-113.013-211.743-154.175c-2.731-1.324-5.527-2.515-8.276-3.807m-302.636 19.483c6.846 0 13.638.274 20.361.732l-58.081 100.561c-81.514 16.526-142.676 85.88-142.676 168.897c0 20.854 3.841 40.819 10.913 59.325c.008.021-.008.053 0 .074l-58.228 100.854c-34.551-44.823-54.932-100.229-54.932-160.182c.001-149.255 126.524-270.262 282.643-270.261m168.969 212.035L638.013 797.271c81.076-16.837 141.797-85.875 141.797-168.603c0-20.474-4.086-39.939-10.914-58.155"
      />
    </svg>
  );
}

export function OpenEyeIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "24";
  const h = height ? height : "24";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill={c}
    >
      <path
        fill={c}
        d="M12 6.5a9.77 9.77 0 0 1 8.82 5.5c-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12A9.77 9.77 0 0 1 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5"
      />
    </svg>
  );
}

export function PostsIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "24";
  const h = height ? height : "24";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 20 20"
      fill={c}
    >
      <path
        fill={c}
        d="M8 17h7.5a1.5 1.5 0 0 0 1.5-1.5v-1a1.5 1.5 0 0 0-1.5-1.5H8zm0-5h7.5a1.5 1.5 0 0 0 1.5-1.5v-1A1.5 1.5 0 0 0 15.5 8H8zM7 8v4H4.5A1.5 1.5 0 0 1 3 10.5v-1A1.5 1.5 0 0 1 4.5 8zm1-1h7.5A1.5 1.5 0 0 0 17 5.5v-1A1.5 1.5 0 0 0 15.5 3H8zM7 3v4H4.5A1.5 1.5 0 0 1 3 5.5v-1A1.5 1.5 0 0 1 4.5 3zm0 10v4H4.5A1.5 1.5 0 0 1 3 15.5v-1A1.5 1.5 0 0 1 4.5 13z"
      />
    </svg>
  );
}

export function UnfilledPostsIcon({
  color,
  width,
  height,
  className,
}: IconProps) {
  const w = width ? width : "24";
  const h = height ? height : "24";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 16 16"
      fill={c}
    >
      <path
        fill="currentColor"
        d="M3.75 2A1.75 1.75 0 0 0 2 3.75v1c0 .49.201.932.525 1.25C2.201 6.318 2 6.76 2 7.25v1.5c0 .49.201.932.525 1.25c-.324.318-.525.76-.525 1.25v1c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0 0 14 12.25v-1c0-.49-.201-.932-.525-1.25c.324-.318.525-.76.525-1.25v-1.5c0-.49-.201-.932-.525-1.25c.324-.318.525-.76.525-1.25v-1A1.75 1.75 0 0 0 12.25 2zM3 11.25a.75.75 0 0 1 .75-.75H5V13H3.75a.75.75 0 0 1-.75-.75zM6 13v-2.5h6.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-.75.75zm0-3.5v-3h6.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75zm0-4V3h6.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-.75.75zM5 3v2.5H3.75A.75.75 0 0 1 3 4.75v-1A.75.75 0 0 1 3.75 3zm0 3.5v3H3.75A.75.75 0 0 1 3 8.75v-1.5a.75.75 0 0 1 .75-.75z"
      />
    </svg>
  );
}

export function ShowIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "28";
  const h = height ? height : "28";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 28 28"
      fill={c}
    >
      <path d="M7 5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.5a1 1 0 1 1 2 0V21a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h4.5a1 1 0 1 1 0 2zm8.5-1a1 1 0 0 1 1-1H24a1 1 0 0 1 1 1v7.5a1 1 0 1 1-2 0V6.414l-5.793 5.793a1 1 0 1 1-1.414-1.414L21.586 5H16.5a1 1 0 0 1-1-1" />
    </svg>
  );
}

export function CopyIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "24";
  const h = height ? height : "24";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke={c}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </g>
    </svg>
  );
}

export function AddIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "24";
  const h = height ? height : "24";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 256 256"
    >
      <g
        fill="none"
        stroke={c}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      >
        <circle cx="128" cy="128" r="112" />
        <path d="M 79.999992,128 H 176.0001" />
        <path d="m 128.00004,79.99995 v 96.0001" />
      </g>
    </svg>
  );
}

export function CodeFileIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "24";
  const h = height ? height : "24";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 14 14"
    >
      <g fill="none" stroke={c} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.5 12.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1H9L12.5 4z" />
        <path d="m5.5 10.5l-2-2l2-2m3 4l2-2l-2-2" />
      </g>
    </svg>
  );
}

export function CheckIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "24";
  const h = height ? height : "24";
  const c = color ? color : "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 48 48"
    >
      <g
        className={className}
        fill="none"
        stroke={c}
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="M24 44a19.937 19.937 0 0 0 14.142-5.858A19.937 19.937 0 0 0 44 24a19.938 19.938 0 0 0-5.858-14.142A19.937 19.937 0 0 0 24 4A19.938 19.938 0 0 0 9.858 9.858A19.938 19.938 0 0 0 4 24a19.937 19.937 0 0 0 5.858 14.142A19.938 19.938 0 0 0 24 44Z" />
        <path strokeLinecap="round" d="m16 24l6 6l12-12" />
      </g>
    </svg>
  );
}

export function HashIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "24";
  const h = height ? height : "24";
  const c = color ? color : "currentColor";
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 24 24"
    >
      <path
        fill={c}
        d="M20 14h-4.3l.73-4H20a1 1 0 0 0 0-2h-3.21l.69-3.81A1 1 0 0 0 16.64 3a1 1 0 0 0-1.22.82L14.67 8h-3.88l.69-3.81A1 1 0 0 0 10.64 3a1 1 0 0 0-1.22.82L8.67 8H4a1 1 0 0 0 0 2h4.3l-.73 4H4a1 1 0 0 0 0 2h3.21l-.69 3.81A1 1 0 0 0 7.36 21a1 1 0 0 0 1.22-.82L9.33 16h3.88l-.69 3.81a1 1 0 0 0 .84 1.19a1 1 0 0 0 1.22-.82l.75-4.18H20a1 1 0 0 0 0-2M9.7 14l.73-4h3.87l-.73 4Z"
      />
    </svg>
  );
}

export function LabEvalIcon({ color, width, height, className }: IconProps) {
  const w = width ? width : "48";
  const h = height ? height : "48";
  return (
    <svg
      className={className}
      width={w}
      height={h}
      viewBox="0 0 72 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_14_12)">
        <rect
          x="65.5846"
          y="30.8019"
          width="24.3478"
          height="22.8019"
          rx="2.5"
          transform="rotate(180 65.5846 30.8019)"
          fill="#0284c7"
        />
      </g>
      <g filter="url(#filter1_d_14_12)">
        <rect
          x="32.3478"
          y="31.9613"
          width="24.3478"
          height="22.8019"
          rx="2.5"
          transform="rotate(180 32.3478 31.9613)"
          fill="#D3493A"
        />
      </g>
      <g filter="url(#filter2_d_14_12)">
        <rect
          x="48.3865"
          y="48"
          width="24.3478"
          height="22.8019"
          rx="2.5"
          transform="rotate(180 48.3865 48)"
          fill="#FFBE39"
        />
      </g>
    </svg>
  );
}

export function LabEvalLogo({ color, width, height, className }: IconProps) {
  const w = width ? width : "197";
  const h = height ? height : "56";
  const textColor = color ? color : "currentColor";
  return (
    <svg
      className={className}
      width={w}
      height={h}
      viewBox="0 0 197 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_14_12)">
        <rect
          x="65.5846"
          y="30.8019"
          width="24.3478"
          height="22.8019"
          rx="2.5"
          transform="rotate(180 65.5846 30.8019)"
          fill="#0284c7"
        />
      </g>
      <g filter="url(#filter1_d_14_12)">
        <rect
          x="32.3478"
          y="31.9613"
          width="24.3478"
          height="22.8019"
          rx="2.5"
          transform="rotate(180 32.3478 31.9613)"
          fill="#D3493A"
        />
      </g>
      <g filter="url(#filter2_d_14_12)">
        <rect
          x="48.3865"
          y="48"
          width="24.3478"
          height="22.8019"
          rx="2.5"
          transform="rotate(180 48.3865 48)"
          fill="#FFBE39"
        />
      </g>
      <path
        d="M78.2955 39V15.7273H82.5114V35.4659H92.7614V39H78.2955ZM101.261 39.3523C100.155 39.3523 99.1591 39.1553 98.2727 38.7614C97.3939 38.3598 96.697 37.7689 96.1818 36.9886C95.6742 36.2083 95.4205 35.2462 95.4205 34.1023C95.4205 33.1174 95.6023 32.303 95.9659 31.6591C96.3295 31.0152 96.8258 30.5 97.4545 30.1136C98.0833 29.7273 98.7917 29.4356 99.5795 29.2386C100.375 29.0341 101.197 28.8864 102.045 28.7955C103.068 28.6894 103.898 28.5947 104.534 28.5114C105.17 28.4205 105.633 28.2841 105.92 28.1023C106.216 27.9129 106.364 27.6212 106.364 27.2273V27.1591C106.364 26.303 106.11 25.6402 105.602 25.1705C105.095 24.7008 104.364 24.4659 103.409 24.4659C102.402 24.4659 101.602 24.6856 101.011 25.125C100.428 25.5644 100.034 26.0833 99.8295 26.6818L95.9886 26.1364C96.2917 25.0758 96.7917 24.1894 97.4886 23.4773C98.1856 22.7576 99.0379 22.2197 100.045 21.8636C101.053 21.5 102.167 21.3182 103.386 21.3182C104.227 21.3182 105.064 21.4167 105.898 21.6136C106.731 21.8106 107.492 22.1364 108.182 22.5909C108.871 23.0379 109.424 23.6477 109.841 24.4205C110.265 25.1932 110.477 26.1591 110.477 27.3182V39H106.523V36.6023H106.386C106.136 37.0871 105.784 37.5417 105.33 37.9659C104.883 38.3826 104.318 38.7197 103.636 38.9773C102.962 39.2273 102.17 39.3523 101.261 39.3523ZM102.33 36.3295C103.155 36.3295 103.871 36.1667 104.477 35.8409C105.083 35.5076 105.549 35.0682 105.875 34.5227C106.208 33.9773 106.375 33.3826 106.375 32.7386V30.6818C106.246 30.7879 106.027 30.8864 105.716 30.9773C105.413 31.0682 105.072 31.1477 104.693 31.2159C104.314 31.2841 103.939 31.3447 103.568 31.3977C103.197 31.4508 102.875 31.4962 102.602 31.5341C101.989 31.6174 101.439 31.7538 100.955 31.9432C100.47 32.1326 100.087 32.3977 99.8068 32.7386C99.5265 33.072 99.3864 33.5038 99.3864 34.0341C99.3864 34.7917 99.6629 35.3636 100.216 35.75C100.769 36.1364 101.473 36.3295 102.33 36.3295ZM114.795 39V15.7273H118.909V24.4318H119.08C119.292 24.0076 119.591 23.5568 119.977 23.0795C120.364 22.5947 120.886 22.1818 121.545 21.8409C122.205 21.4924 123.045 21.3182 124.068 21.3182C125.417 21.3182 126.633 21.6629 127.716 22.3523C128.807 23.0341 129.67 24.0455 130.307 25.3864C130.951 26.7197 131.273 28.3561 131.273 30.2955C131.273 32.2121 130.958 33.8409 130.33 35.1818C129.701 36.5227 128.845 37.5455 127.761 38.25C126.678 38.9545 125.451 39.3068 124.08 39.3068C123.08 39.3068 122.25 39.1402 121.591 38.8068C120.932 38.4735 120.402 38.072 120 37.6023C119.606 37.125 119.299 36.6742 119.08 36.25H118.841V39H114.795ZM118.83 30.2727C118.83 31.4015 118.989 32.3902 119.307 33.2386C119.633 34.0871 120.098 34.75 120.705 35.2273C121.318 35.697 122.061 35.9318 122.932 35.9318C123.841 35.9318 124.602 35.6894 125.216 35.2045C125.83 34.7121 126.292 34.0417 126.602 33.1932C126.92 32.3371 127.08 31.3636 127.08 30.2727C127.08 29.1894 126.924 28.2273 126.614 27.3864C126.303 26.5455 125.841 25.8864 125.227 25.4091C124.614 24.9318 123.848 24.6932 122.932 24.6932C122.053 24.6932 121.307 24.9242 120.693 25.3864C120.08 25.8485 119.614 26.4962 119.295 27.3295C118.985 28.1629 118.83 29.1439 118.83 30.2727Z"
        className={className}
        fill={textColor}
      />
      <path
        d="M134.952 39V15.7273H150.088V19.2614H139.168V25.5795H149.304V29.1136H139.168V35.4659H150.179V39H134.952ZM169.798 21.5455L163.582 39H159.037L152.821 21.5455H157.207L161.219 34.5114H161.401L165.423 21.5455H169.798ZM177.168 39.3523C176.062 39.3523 175.065 39.1553 174.179 38.7614C173.3 38.3598 172.603 37.7689 172.088 36.9886C171.58 36.2083 171.327 35.2462 171.327 34.1023C171.327 33.1174 171.509 32.303 171.872 31.6591C172.236 31.0152 172.732 30.5 173.361 30.1136C173.99 29.7273 174.698 29.4356 175.486 29.2386C176.281 29.0341 177.103 28.8864 177.952 28.7955C178.974 28.6894 179.804 28.5947 180.44 28.5114C181.077 28.4205 181.539 28.2841 181.827 28.1023C182.122 27.9129 182.27 27.6212 182.27 27.2273V27.1591C182.27 26.303 182.016 25.6402 181.509 25.1705C181.001 24.7008 180.27 24.4659 179.315 24.4659C178.308 24.4659 177.509 24.6856 176.918 25.125C176.334 25.5644 175.94 26.0833 175.736 26.6818L171.895 26.1364C172.198 25.0758 172.698 24.1894 173.395 23.4773C174.092 22.7576 174.944 22.2197 175.952 21.8636C176.959 21.5 178.073 21.3182 179.293 21.3182C180.134 21.3182 180.971 21.4167 181.804 21.6136C182.637 21.8106 183.399 22.1364 184.088 22.5909C184.777 23.0379 185.33 23.6477 185.747 24.4205C186.171 25.1932 186.384 26.1591 186.384 27.3182V39H182.429V36.6023H182.293C182.043 37.0871 181.69 37.5417 181.236 37.9659C180.789 38.3826 180.224 38.7197 179.543 38.9773C178.868 39.2273 178.077 39.3523 177.168 39.3523ZM178.236 36.3295C179.062 36.3295 179.777 36.1667 180.384 35.8409C180.99 35.5076 181.455 35.0682 181.781 34.5227C182.115 33.9773 182.281 33.3826 182.281 32.7386V30.6818C182.152 30.7879 181.933 30.8864 181.622 30.9773C181.319 31.0682 180.978 31.1477 180.599 31.2159C180.221 31.2841 179.846 31.3447 179.474 31.3977C179.103 31.4508 178.781 31.4962 178.509 31.5341C177.895 31.6174 177.346 31.7538 176.861 31.9432C176.376 32.1326 175.993 32.3977 175.713 32.7386C175.433 33.072 175.293 33.5038 175.293 34.0341C175.293 34.7917 175.569 35.3636 176.122 35.75C176.675 36.1364 177.38 36.3295 178.236 36.3295ZM194.634 15.7273V39H190.52V15.7273H194.634Z"
        fill="#0284c7"
      />
      <defs>
        <filter
          id="filter0_d_14_12"
          x="33.2367"
          y="0"
          width="40.3478"
          height="38.8019"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_14_12"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_14_12"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_14_12"
          x="0"
          y="1.15942"
          width="40.3478"
          height="38.8019"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_14_12"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_14_12"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_14_12"
          x="16.0387"
          y="17.1981"
          width="40.3478"
          height="38.8019"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_14_12"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_14_12"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
