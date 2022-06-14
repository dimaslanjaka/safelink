/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Get all method from class
 * @param toCheck
 * @returns
 */
const getAllMethods = function (toCheck) {
    if (!toCheck)
        return [];
    try {
        const props = [];
        let obj = toCheck;
        do {
            props.push(...Object.getOwnPropertyNames(obj));
        } while ((obj = Object.getPrototypeOf(obj)));
        return props
            .sort()
            .filter((e, i, arr_fname) => {
            const c = toCheck[e];
            const fname = arr_fname[i + 1];
            if (e != fname && typeof c == 'function')
                return true;
        })
            .filter((fname) => {
            return ![
                '__defineGetter__',
                '__defineSetter__',
                '__lookupGetter__',
                '__lookupSetter__',
                'constructor',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'toLocaleString',
                'toString',
                'valueOf',
            ].includes(fname);
        });
    }
    catch (e) {
        return Object.getOwnPropertyNames(toCheck).filter((prop) => typeof toCheck[prop] === 'function');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0RBQXNEO0FBQ3REOzs7O0dBSUc7QUFDSCxNQUFNLGFBQWEsR0FBRyxVQUFVLE9BQStCO0lBQzdELElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFDeEIsSUFBSTtRQUNGLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDbEIsR0FBRztZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoRCxRQUFRLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUM3QyxPQUFPLEtBQUs7YUFDVCxJQUFJLEVBQUU7YUFDTixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxHQUFtQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLElBQUksVUFBVTtnQkFBRSxPQUFPLElBQUksQ0FBQztRQUN4RCxDQUFDLENBQUM7YUFDRCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNoQixPQUFPLENBQUM7Z0JBQ04sa0JBQWtCO2dCQUNsQixrQkFBa0I7Z0JBQ2xCLGtCQUFrQjtnQkFDbEIsa0JBQWtCO2dCQUNsQixhQUFhO2dCQUNiLGdCQUFnQjtnQkFDaEIsZUFBZTtnQkFDZixzQkFBc0I7Z0JBQ3RCLGdCQUFnQjtnQkFDaEIsVUFBVTtnQkFDVixTQUFTO2FBQ1YsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQztLQUNsRztBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuLyoqXG4gKiBHZXQgYWxsIG1ldGhvZCBmcm9tIGNsYXNzXG4gKiBAcGFyYW0gdG9DaGVja1xuICogQHJldHVybnNcbiAqL1xuY29uc3QgZ2V0QWxsTWV0aG9kcyA9IGZ1bmN0aW9uICh0b0NoZWNrOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gIGlmICghdG9DaGVjaykgcmV0dXJuIFtdO1xuICB0cnkge1xuICAgIGNvbnN0IHByb3BzID0gW107XG4gICAgbGV0IG9iaiA9IHRvQ2hlY2s7XG4gICAgZG8ge1xuICAgICAgcHJvcHMucHVzaCguLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKTtcbiAgICB9IHdoaWxlICgob2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpKTtcbiAgICByZXR1cm4gcHJvcHNcbiAgICAgIC5zb3J0KClcbiAgICAgIC5maWx0ZXIoKGUsIGksIGFycl9mbmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBjOiBDbGFzc0RlY29yYXRvciA9IHRvQ2hlY2tbZV07XG4gICAgICAgIGNvbnN0IGZuYW1lID0gYXJyX2ZuYW1lW2kgKyAxXTtcbiAgICAgICAgaWYgKGUgIT0gZm5hbWUgJiYgdHlwZW9mIGMgPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHRydWU7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigoZm5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuICFbXG4gICAgICAgICAgJ19fZGVmaW5lR2V0dGVyX18nLFxuICAgICAgICAgICdfX2RlZmluZVNldHRlcl9fJyxcbiAgICAgICAgICAnX19sb29rdXBHZXR0ZXJfXycsXG4gICAgICAgICAgJ19fbG9va3VwU2V0dGVyX18nLFxuICAgICAgICAgICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgJ2hhc093blByb3BlcnR5JyxcbiAgICAgICAgICAnaXNQcm90b3R5cGVPZicsXG4gICAgICAgICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgICAgICAgICAndG9Mb2NhbGVTdHJpbmcnLFxuICAgICAgICAgICd0b1N0cmluZycsXG4gICAgICAgICAgJ3ZhbHVlT2YnLFxuICAgICAgICBdLmluY2x1ZGVzKGZuYW1lKTtcbiAgICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRvQ2hlY2spLmZpbHRlcigocHJvcCkgPT4gdHlwZW9mIHRvQ2hlY2tbcHJvcF0gPT09ICdmdW5jdGlvbicpO1xuICB9XG59O1xuIl19