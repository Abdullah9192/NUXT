export default defineAppConfig({
    ui: {
      colors: {
        primary: 'blue',
        neutral: 'zinc'
      },
      button: {
        variants: {
          size: {
            '2xl': {
              base: 'p-2 text-base gap-2',
              leadingIcon: 'size-12',
              leadingAvatarSize: 'xs',
              trailingIcon: 'size-12'
            }
          }
        }
      }
    }
  })

